import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { CoffeesModule } from './coffees/coffees.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // makes it code first
      // autoSchemaFile: true, // in memory
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false, // turn it off if we want to get the ApolloStudio sandbox
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // buildSchemaOptions: {
      //   numberScalarMode: "integer",
      // }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
      autoLoadEntities: true,
      logging: true,
    }),
    CoffeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
