import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, services } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
	imports: [
		ClientsModule.register([
			{
				name: services.ORDERS_SERVICE,
				transport: Transport.TCP,
				options: {
					host: envs.ordersMsHost,
					port: envs.ordersMsPort,
				},
			},
		]),
	],
})
export class OrdersModule {}
