// 封装阅读统计逻辑
import { supabase } from '@/lib/upabaseClient';

export async function incrementView(slug: string) {
  const { error } = await supabase
    .from('views')
    .upsert(
      { slug, count: 1 },
      { onConflict: 'slug', ignoreDuplicates: false, updateColumns: ['count'] }
    )
    .select();

  if (error) {
    console.error('记录阅读失败', error);
  } else {
    // 增加 1
    await supabase.rpc('increment_view_count', { slug_param: slug });
  }
}

export async function getViewCount(slug: string): Promise<number> {
  const { data, error } = await supabase
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();

  if (error || !data) return 0;
  return data.count;
}
