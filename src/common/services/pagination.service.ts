import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaginationService {
  constructor(private readonly configService: ConfigService, private readonly prisma: PrismaService) { }

  async paginate(entity: any, data: any, relation?: string) {

    let [items, count] = await this.prisma.$transaction([
      (this.prisma[entity] as any).findMany(data),
      (this.prisma[entity] as any).count({ where: data.where }),
    ]);

    if (relation == 'clients') {
      items = items.map((item: any) => ({
        ...item,
        clients: item.clients.map((client: any) => client.client),
      }));
    }

    if (relation == 'bookingManager') {
      items = items.map((item: any) => {
        if (item.candidate === null) {
          return item;
        }

        const { candidate, ...rest } = item;
        const { candidate: innerCandidate, ...restOfCandidate } = candidate;

        return {
          ...rest,
          candidate: {
            ...restOfCandidate,
            bookingManager: {
              ...innerCandidate.bookingManager,
            }
          }
        };
      });
    }

    return {
      data: items,
      meta: {
        totalCount: count,
        count: items.length,
        totalPages: Math.ceil(count / (data.take ?? this.configService.get<number>('pagination.perPage'))),
        page: ((data.skip ?? 0) / (data.take ?? this.configService.get<number>('pagination.perPage'))) + 1,
      },
    };
  }
}
