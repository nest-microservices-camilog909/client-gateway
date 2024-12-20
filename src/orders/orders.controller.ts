import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Inject,
	ParseUUIDPipe,
	Query,
	Patch,
} from '@nestjs/common';
import { services } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto, CreateOrderDto, StatusOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
	constructor(
		@Inject(services.NATS_SERVICE)
		private readonly client: ClientProxy,
	) {}

	@Post()
	create(@Body() request: CreateOrderDto) {
		return this.client.send('create', request).pipe(
			catchError((err) => {
				throw new RpcException(err);
			}),
		);
	}

	@Get()
	findAll(@Query() pagination: OrderPaginationDto) {
		return this.client.send('findAll', pagination).pipe(
			catchError((err) => {
				throw new RpcException(err);
			}),
		);
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.client.send('findOne', { id }).pipe(
			catchError((err) => {
				throw new RpcException(err);
			}),
		);
	}

	@Patch(':id')
	changeStatus(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() request: StatusOrderDto,
	) {
		return this.client
			.send('changeStatus', { id, status: request.status })
			.pipe(
				catchError((err) => {
					throw new RpcException(err);
				}),
			);
	}
}
