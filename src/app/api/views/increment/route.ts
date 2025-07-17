import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: '缺少 slug 参数' }, { status: 400 });
    }

    // 这里传入参数名改为 slug_param，和数据库函数参数名保持一致
    const { error } = await supabase.rpc('increment_view_count', {
      slug_param: slug,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '浏览量更新成功' });
  } catch (e) {
    return NextResponse.json(
      { error: '服务器错误', detail: String(e) },
      { status: 500 }
    );
  }
}
