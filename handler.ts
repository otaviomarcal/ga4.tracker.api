import { APIGatewayProxyHandler } from 'aws-lambda';
import serverless from 'serverless-http';
import app from './src/index';

export const AnalyticsHandler: APIGatewayProxyHandler = serverless(app);
