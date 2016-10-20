package com.codepal.api;

<<<<<<< HEAD
import com.codepal.api.auth.ExampleAuthenticator;
=======
>>>>>>> 0882e7ef8b3d000a759c79ac127bc63f4121dc07
import com.codepal.api.auth.ExampleAuthorizer;
import com.codepal.api.cli.RenderCommand;
import com.codepal.api.core.Person;
import com.codepal.api.core.Template;
import com.codepal.api.core.User;
import com.codepal.api.db.PersonDAO;
import com.codepal.api.filter.DateRequiredFeature;
import com.codepal.api.health.TemplateHealthCheck;
<<<<<<< HEAD
import com.codepal.api.resources.*;
import com.codepal.api.tasks.EchoTask;
import com.datastax.driver.core.Cluster;
=======
import com.codepal.api.tasks.EchoTask;
import com.codepal.api.auth.ExampleAuthenticator;
import com.codepal.api.resources.FilteredResource;
import com.codepal.api.resources.HelloWorldResource;
import com.codepal.api.resources.PeopleResource;
import com.codepal.api.resources.PersonResource;
import com.codepal.api.resources.ProtectedResource;
import com.codepal.api.resources.ViewResource;
>>>>>>> 0882e7ef8b3d000a759c79ac127bc63f4121dc07
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import java.util.Map;

public class MainApplication extends Application<MainConfiguration> {
    public static void main(String[] args) throws Exception {
        new MainApplication().run(args);
    }

    private final HibernateBundle<MainConfiguration> hibernateBundle =
        new HibernateBundle<MainConfiguration>(Person.class) {
            @Override
            public DataSourceFactory getDataSourceFactory(MainConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        };

    @Override
    public String getName() {
        return "hello-world";
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
        bootstrap.addBundle(new AssetsBundle());
        bootstrap.addBundle(new MigrationsBundle<MainConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(MainConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(hibernateBundle);
        bootstrap.addBundle(new ViewBundle<MainConfiguration>() {
            @Override
            public Map<String, Map<String, String>> getViewConfiguration(MainConfiguration configuration) {
                return configuration.getViewRendererConfiguration();
            }
        });
    }

    @Override
    public void run(MainConfiguration configuration, Environment environment) {
        final PersonDAO dao = new PersonDAO(hibernateBundle.getSessionFactory());
        final Template template = configuration.buildTemplate();

        environment.healthChecks().register("template", new TemplateHealthCheck(template));
        environment.admin().addTask(new EchoTask());
        environment.jersey().register(DateRequiredFeature.class);
        environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<User>()
                .setAuthenticator(new ExampleAuthenticator())
                .setAuthorizer(new ExampleAuthorizer())
                .setRealm("SUPER SECRET STUFF")
                .buildAuthFilter()));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new HelloWorldResource(template));
        environment.jersey().register(new ViewResource());
        environment.jersey().register(new ProtectedResource());
        environment.jersey().register(new PeopleResource(dao));
        environment.jersey().register(new PersonResource(dao));
        environment.jersey().register(new FilteredResource());
<<<<<<< HEAD
        // Cassandra dropwizard configs
        Cluster cassandra = configuration.getCassandraFactory().build(environment);
=======
>>>>>>> 0882e7ef8b3d000a759c79ac127bc63f4121dc07
    }
}
