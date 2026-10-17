"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="relative z-20 bg-[#03050B] px-6 py-28 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#0B1220]/80 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>08 / Academic Journey</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display">
            EDUCATION.
          </h2>

          <p className="max-w-xl text-base text-[#9CA8BD] font-light leading-relaxed">
            Academic training in computer science, machine learning, systems architecture, and core mathematical foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {PORTFOLIO_DATA.education.map((item, idx) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-3xl border border-white/10 bg-[#080D18]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/40 hover:bg-[#0B1220] hover:shadow-[0_15px_40px_-10px_rgba(0,217,255,0.15)] flex flex-col lg:flex-row lg:items-start justify-between gap-6"
            >
              {/* Institution & Period */}
              <div className="lg:w-1/3 space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-3 py-1 text-xs font-mono font-semibold text-[#00D9FF]">
                  <Calendar className="h-3 w-3" />
                  {item.period}
                </span>

                <h4 className="text-lg font-bold text-white pt-1">
                  {item.institution}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#9CA8BD]">
                  <MapPin className="h-3 w-3 text-[#7657FF]" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Degree & Coursework */}
              <div className="lg:w-2/3 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {item.degree}
                  </h3>
                  {item.specialization && (
                    <p className="text-sm font-mono text-[#7657FF] mt-1">
                      {item.specialization}
                    </p>
                  )}
                </div>

                {/* Coursework Tags */}
                <div className="pt-2">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[#9CA8BD] uppercase tracking-wider mb-2.5">
                    <BookOpen className="h-3 w-3 text-[#00D9FF]" />
                    <span>Relevant Coursework & Studies:</span>
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-lg border border-white/10 bg-[#03050B] px-2.5 py-1 text-xs font-mono text-neutral-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
