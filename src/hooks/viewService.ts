import { supabase } from '@/lib/upabaseClient';

// 自增阅读量
export async function incrementView(slug: string) {
  // 1. 查询是否存在
  const { data: existing, error: queryError } = await supabase
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();

  if (queryError && queryError.code !== 'PGRST116') {
    console.error('查询出错', queryError);
    return;
  }

  // 2. 更新或插入
  if (existing) {
    const { error: updateError } = await supabase
      .from('views')
      .update({ count: existing.count + 1 })
      .eq('slug', slug);

    if (updateError) {
      console.error('更新阅读失败', updateError);
    }
  } else {
    const { error: insertError } = await supabase
      .from('views')
      .insert({ slug, count: 1 });

    if (insertError) {
      console.error('插入阅读失败', insertError);
    }
  }
}

// 获取阅读量
export async function getViewCount(slug: string): Promise<number> {
  const { data, error } = await supabase
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();

  if (error || !data) return 0;
  return data.count;
}
