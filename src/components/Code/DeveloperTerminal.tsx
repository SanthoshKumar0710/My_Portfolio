"use client";

import React, { useState } from "react";
import { Terminal, CornerDownLeft, Sparkles, Check, Copy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const DeveloperTerminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "whoami",
      output:
        "Santhosh Kumar — AI/ML Engineer | Python Developer | Machine Learning Enthusiast\nLocation: Chennai, Tamil Nadu, India\nFocus: Intelligent Systems, Computer Vision, Deep Learning & Predictive Engineering.",
    },
    {
      cmd: "skills",
      output:
        "Programming: Python, Java, C, JavaScript, SQL\nAI / ML: Machine Learning, Deep Learning, NLP, Computer Vision, Predictive Analytics\nLibraries: NumPy, Pandas, Scikit-learn, TensorFlow/Keras, PyTorch, OpenCV, XGBoost, Matplotlib\nBackend & Web: React, FastAPI, Flask, REST APIs, HTML5, CSS3\nDatabases & Tools: PostgreSQL, MongoDB, MySQL, Docker, Git, Linux",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    const matched = PORTFOLIO_DATA.terminalCommands.find((c) => c.cmd === trimmed);
    let output = "";
    if (matched) {
      output = matched.output;
    } else if (trimmed === "help") {
      output =
        "Supported commands: whoami, skills, projects, education, certifications, contact, clear, help";
    } else {
      output = `Command not recognized: "${cmd}". Type "help" for a list of supported commands.`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputVal.trim()) {
      runCommand(inputVal);
    }
  };

  return (
    <section
      id="terminal"
      className="relative z-20 bg-[#03050B] px-6 py-24 sm:px-12 md:px-20 lg:px-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] backdrop-blur-md">
            <Terminal className="h-3.5 w-3.5" />
            <span>AI / ML Engineer Terminal</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-display">
            DEVELOPER <span className="text-gradient-ai">TERMINAL.</span>
          </h3>

          <p className="text-sm sm:text-base text-[#9CA8BD] font-light max-w-xl">
            Direct interactive interface into my verified stack, project architectures, and engineering profiles.
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#9CA8BD] mr-2">Quick run:</span>
          {[
            "whoami",
            "skills",
            "projects",
            "education",
            "certifications",
            "contact",
            "help",
            "clear",
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="rounded-lg border border-white/10 bg-[#080D18] px-3 py-1 text-xs font-mono text-[#00D9FF] hover:border-[#00D9FF]/50 hover:bg-[#00D9FF]/10 transition-colors"
            >
              $ {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl border border-[#00D9FF]/20 bg-[#080D18] shadow-[0_0_50px_rgba(0,217,255,0.08)] overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Window Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#03050B] px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-[#9CA8BD]">santhosh@ai-lab:~ (zsh)</span>
            <span className="text-[11px] text-[#00D9FF] font-bold">PYTHON v3.12</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#00D9FF]">
                  <span className="text-neutral-500">➜</span>
                  <span className="text-[#7657FF] font-semibold">santhosh@ai-lab</span>
                  <span className="text-neutral-500">:~$</span>
                  <span className="text-white font-medium">{item.cmd}</span>
                </div>
                <div className="whitespace-pre-wrap text-neutral-300 pl-4 border-l-2 border-[#00D9FF]/30 leading-relaxed font-mono text-xs">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Live Prompt Input */}
            <div className="flex items-center gap-2 text-[#00D9FF] pt-2">
              <span className="text-neutral-500">➜</span>
              <span className="text-[#7657FF] font-semibold">santhosh@ai-lab</span>
              <span className="text-neutral-500">:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'projects', 'skills', 'education')..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-600 font-mono text-xs sm:text-sm"
              />
              <button
                onClick={() => inputVal.trim() && runCommand(inputVal)}
                className="text-neutral-500 hover:text-[#00D9FF] transition-colors"
                aria-label="Submit command"
              >
                <CornerDownLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
