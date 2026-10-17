"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ShieldCheck, Tag } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Award className="h-3.5 w-3.5" />
            <span>09 / Continuous Learning</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            CERTIFICATIONS & <span className="text-gradient-ai">LEARNING.</span>
          </h2>

          <p className="max-w-xl text-base text-[#9CA8BD] font-light leading-relaxed">
            Verified coursework and industry credentials covering artificial intelligence, machine learning pipelines, cloud services, and database engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group rounded-2xl border border-white/10 bg-[#080D18]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/40 hover:bg-[#0B1220] hover:shadow-[0_10px_35px_-5px_rgba(0,217,255,0.15)] flex flex-col justify-between"
            >
              <div>
                {/* Header with Issuer */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#03050B] px-3 py-1 text-[11px] font-mono text-[#9CA8BD]">
                    <ShieldCheck className="h-3 w-3 text-[#00D9FF]" />
                    {cert.issuer}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#00D9FF] group-hover:scale-125 transition-transform" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Skills tags covered */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-[#03050B]/60 border border-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-[#9CA8BD]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00D9FF]" />
                <span>Verified Resume Credential</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
