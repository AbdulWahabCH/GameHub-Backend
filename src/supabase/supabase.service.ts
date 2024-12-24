import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient, AuthResponse } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }
  
  getClient() {
    return this.supabase;
  }
}
