import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function Documentation(data: Definition) {
  const responses: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [];

  data.responses?.forEach((resp) => {
    responses.push(
      ApiResponse({
        status: resp.status || 200,
        description: resp.description || 'Success response',
        type: resp.type,
      }),
    );
  });

  data.errors?.forEach((err) => {
    responses.push(
      ApiResponse({
        status: err.status,
        description: err.description,
        type: err.type,
      }),
    );
  });

  return applyDecorators(
    ApiOperation({ summary: data.title, description: data.description }),
    ApiHeader({
      name: 'user_id',
      required: true,
      description: 'ID of the authenticated user',
    }),
    ...responses,
    ApiInternalServerErrorResponse({
      description: 'Unexpected error from the service',
      type: InternalServerErrorApiResponse,
    }),
  );
}

interface Definition {
  title: string;
  description?: string;
  responses?: {
    status?: number;
    description?: string;
    type?: any;
  }[];
  errors?: {
    status: number;
    description: string;
    type?: any;
  }[];
}

class InternalServerErrorApiResponse {
  @ApiProperty({ default: 500 })
  statusCode: number;

  @ApiProperty({ default: 'Internal Server Error' })
  error: string;

  @ApiProperty({ default: 'Internal server error' })
  message: string;
}
