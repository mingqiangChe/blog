import { createClient } from '@supabase/supabase-js';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ 必须保证该变量存在
  );

  try {
    const body = await req.json();
    const slug: string = body.slug;

    if (!slug || typeof slug !== 'string') {
      return Response.json(
        { error: 'Missing or invalid slug' },
        { status: 400 }
      );
    }

    // upsert 插入或更新
    const { error: upsertError } = await supabase
      .from('views')
      .upsert({ slug, count: 1 }, { onConflict: 'slug' });

    if (upsertError) throw upsertError;

    // count + 1
    const { data: updated, error: updateError } = await supabase.rpc(
      'increment_view_count',
      { input_slug: slug }
    );

    if (updateError) throw updateError;

    return Response.json({ count: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('View count error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
