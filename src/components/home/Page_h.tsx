'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Page_h() {
  const t = useTranslations('PageIndex');

  return (
    <section className="relative z-10 text-center px-4 pt-32 pb-20">
      {/* 主标题：名字 */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-[#ff0033] drop-shadow-[0_0_10px_#ff6688] tracking-widest font-racing"
      >
        {t('pageheader')}
      </motion.h1>

      {/* 副标题：座右铭 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-6 text-lg md:text-xl text-[#ddd] font-medium tracking-wide italic font-mono"
      >
        {t('motto')}
      </motion.p>
    </section>
  );
}
