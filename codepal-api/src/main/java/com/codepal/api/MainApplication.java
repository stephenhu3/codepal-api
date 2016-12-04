package com.codepal.api;

import com.codepal.api.cli.RenderCommand;
import com.codepal.api.core.Template;
import com.codepal.api.filter.CrossOriginResponseFilter;
import com.codepal.api.health.TemplateHealthCheck;
import com.codepal.api.resources.SnippetResource;
import com.codepal.api.resources.UserResource;
import com.codepal.api.tasks.EchoTask;
import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.Session;

import java.util.Map;

import io.dropwizard.Application;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;

public class MainApplication extends Application<MainConfiguration> {
    public enum Cassandra {
        INSTANCE;
        private static Cluster cluster;
        private static Session session;

        public static Cluster getCluster() {
            if (cluster == null || cluster.isClosed()) {
                cluster = Cluster.builder().addContactPoint("localhost").build();
            }
            return cluster;
        }

        public static Session getSession() {
            if (session == null) {
                session = getCluster().connect("codepal");
            }
            return session;
        }
    }

    public static void main(String[] args) throws Exception {
        new MainApplication().run(args);
    }

    @Override
    public String getName() {
        return "hello-world-codepal";
    }

    @Override
    public void initialize(Bootstrap<MainConfiguration> bootstrap) {
        // Enable variable substitution with environment variables
        bootstrap.setConfigurationSourceProvider(
                new SubstitutingSourceProvider(
                        bootstrap.getConfigurationSourceProvider(),
                        new EnvironmentVariableSubstitutor(false)
                )
        );

        bootstrap.addCommand(new RenderCommand());
        bootstrap.addBundle(new MigrationsBundle<MainConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(MainConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(new ViewBundle<MainConfiguration>() {
            @Override
            public Map<String, Map<String, String>> getViewConfiguration(MainConfiguration configuration) {
                return configuration.getViewRendererConfiguration();
            }
        });
    }

    @Override
    public void run(MainConfiguration configuration, Environment environment) {
        final Template template = configuration.buildTemplate();

        environment.healthChecks().register("template", new TemplateHealthCheck(template));
        environment.admin().addTask(new EchoTask());
        environment.jersey().register(CrossOriginResponseFilter.class);
        environment.jersey().register(new UserResource());
        environment.jersey().register(new SnippetResource());

        // Cassandra dropwizard configs
        Cluster cassandra = configuration.getCassandraFactory().build(environment);
    }
}
