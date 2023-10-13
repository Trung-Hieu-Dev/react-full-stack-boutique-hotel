import supabase from "./supabase.js";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log("login", data);

  return data;
}

export async function getCurrentUser() {
  // get access session token from  local storage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // get user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}
