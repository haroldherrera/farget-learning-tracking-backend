import { Prisma } from '@prisma/client';
import { Response } from 'express';

export interface PrismaError {
  status: number;
  code: string;
  message: string;
}

export function sendErrorResponse(error: unknown, res: Response) {
  console.log('The Real Error', error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error);
    return res.status(prismaError.status).json(prismaError);
  }

  console.error('Unhandled Error:', error);

  return res
    .status(500)
    .json({ code: 'INTERNAL_ERROR', message: 'An unexpected error occured.' });
}

export function handlePrismaError(error: unknown): PrismaError {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError))
    return {
      status: 500,
      code: 'INTERNAL_ERROR',
      message: 'An unexpected database error occurred.',
    };

  const fields = (error.meta?.target as string[] | undefined)?.join(', ');

  switch (error.code) {
    case 'P2000':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Value too long for field.',
      };

    case 'P2001':
      return { status: 404, code: 'NOT_FOUND', message: 'Record not found.' };

    case 'P2002':
      return {
        status: 409,
        code: 'CONFLICT',
        message: `The value for ${
          fields ?? 'a unique field'
        } is already in use.`,
      };

    case 'P2003':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Foreign key constraint failed.',
      };

    case 'P2004':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'A database constraint failed.',
      };

    case 'P2005':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Invalid value for field type.',
      };

    case 'P2006':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Required field not set.',
      };

    case 'P2007':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Data validation error.',
      };

    case 'P2008':
      return {
        status: 500,
        code: 'INTERNAL_ERROR',
        message: 'Query parsing error.',
      };

    case 'P2009':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Query validation error.',
      };

    case 'P2010':
      return {
        status: 500,
        code: 'INTERNAL_ERROR',
        message: 'Raw query failed.',
      };

    case 'P2011':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Null constraint violation.',
      };

    case 'P2012':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Missing required value.',
      };

    case 'P2013':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Missing required argument.',
      };

    case 'P2014':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Relation constraint violation.',
      };

    case 'P2015':
      return {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Related record not found.',
      };

    case 'P2016':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Query interpretation error.',
      };

    case 'P2017':
      return {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Required connected records not found.',
      };

    case 'P2018':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Invalid record ID.',
      };

    case 'P2019':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Input error in query transformation.',
      };

    case 'P2020':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Value out of range.',
      };

    case 'P2021':
    case 'P2022':
    case 'P2023':
    case 'P2024':
    case 'P2026':
    case 'P2027':
    case 'P2028':
      return {
        status: 500,
        code: 'INTERNAL_ERROR',
        message: 'Database error occurred.',
      };

    case 'P2025':
      return {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Record not found for operation.',
      };

    case 'P2030':
      return {
        status: 409,
        code: 'CONFLICT',
        message: 'Concurrent update conflict.',
      };

    case 'P2033':
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Invalid JSON value.',
      };

    default:
      return {
        status: 500,
        code: 'INTERNAL_ERROR',
        message: 'An unexpected database error occurred.',
      };
  }
}
