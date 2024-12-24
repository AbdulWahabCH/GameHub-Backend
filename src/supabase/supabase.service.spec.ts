import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from './supabase.service';
import { ConfigModule } from '@nestjs/config';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    // Create a testing module with SupabaseService
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          ConfigModule.forRoot({
            isGlobal: true,
          }),
        ],
      providers: [SupabaseService],

    }).compile();

    service = module.get<SupabaseService>(SupabaseService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('log in the user',async () => {
    const { data, error } = await service.signIn('validUserEmail','validPassword');
    expect(error).toBeNull();
  })
});
