import { supabase } from "../supabaseClient";

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const login = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};
