"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bot,
  Send,
  FileText,
  Search,
  PenLine,
  Sparkles,
  MessageSquare,
  Loader2,
  Copy,
  Check,
} from "lucide-react"

type TaskType = "meta-tags" | "keywords" | "content-outline" | "optimize" | "freeform"

type Message = {
  role: "user" | "assistant"
  task?: TaskType
  content: string
}

const tasks: { id: TaskType; label: string; icon: typeof FileText; desc: string; placeholder: string }[] = [
  {
    id: "meta-tags",
    label: "Balises Meta",
    icon: FileText,
    desc: "Générer title + description",
    placeholder: "Décrivez la page (ex: Page d'accueil d'un plombier à Dijon spécialisé en rénovation)",
  },
  {
    id: "keywords",
    label: "Mots-clés",
    icon: Search,
    desc: "Recherche sémantique",
    placeholder: "Entrez votre sujet ou activité (ex: boulangerie artisanale Dijon)",
  },
  {
    id: "content-outline",
    label: "Plan d'article",
    icon: PenLine,
    desc: "Structure SEO optimisée",
    placeholder: "Sujet de l'article (ex: Comment choisir son photographe de mariage en Bourgogne)",
  },
  {
    id: "optimize",
    label: "Optimiser un texte",
    icon: Sparkles,
    desc: "Améliorer le SEO d'un contenu",
    placeholder: "Collez ici le texte à optimiser...",
  },
  {
    id: "freeform",
    label: "Question libre",
    icon: MessageSquare,
    desc: "Posez votre question SEO",
    placeholder: "Votre question SEO (ex: Comment améliorer mon référencement local à Dijon ?)",
  },
]

function MarkdownRenderer({ content }: { content: string }) {
  // Simple markdown rendering
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("### ")) {
      elements.push(<h4 key={i} className="text-sm font-bold text-slate-900 dark:text-white mt-4 mb-1">{line.slice(4)}</h4>)
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={i} className="text-base font-bold text-slate-900 dark:text-white mt-5 mb-2">{line.slice(3)}</h3>)
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={i} className="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">{line.slice(2)}</h2>)
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={i} className="text-sm text-slate-600 dark:text-slate-300 ml-4 list-disc leading-relaxed">
          {renderInline(line.slice(2))}
        </li>
      )
    } else if (line.startsWith("```")) {
      // Code block start/end
      const endIdx = lines.indexOf("```", i + 1)
      if (endIdx > i) {
        const code = lines.slice(i + 1, endIdx).join("\n")
        elements.push(
          <pre key={i} className="mt-2 mb-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap">
            {code}
          </pre>
        )
        i = endIdx
      }
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-3 my-2 text-sm text-slate-500 dark:text-slate-400 italic">
          {renderInline(line.slice(2))}
        </blockquote>
      )
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="my-4 border-slate-100 dark:border-slate-800" />)
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />)
    } else {
      elements.push(<p key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{renderInline(line)}</p>)
    }
  }

  return <div>{elements}</div>
}

function renderInline(text: string) {
  // Bold: **text**
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-indigo-600 dark:text-indigo-400">{part.slice(1, -1)}</code>
    }
    return part
  })
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copié" : "Copier"}
    </button>
  )
}

export function SeoAgent() {
  const [selectedTask, setSelectedTask] = useState<TaskType>("meta-tags")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const currentTask = tasks.find((t) => t.id === selectedTask)!

  useEffect(() => {
    if (resultsRef.current && messages.length > 0) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = { role: "user", task: selectedTask, content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/seo-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: selectedTask, input: input.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: `Erreur : ${data.error || "Une erreur est survenue."}` }])
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.result }])
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Erreur : Impossible de contacter le serveur." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar — task selector */}
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
            Type de tâche
          </p>
          {tasks.map((task) => {
            const Icon = task.icon
            const active = selectedTask === task.id
            return (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                  active
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  active
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${active ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-300"}`}>
                    {task.label}
                  </p>
                  <p className="text-[11px] text-slate-400">{task.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main area */}
        <div className="space-y-4">
          {/* Messages */}
          <div ref={resultsRef} className="space-y-4 min-h-[200px]">
            {messages.length === 0 && (
              <Card className="p-10 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 mb-4">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Agent SEO Globe Créateur
                </h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Sélectionnez une tâche et décrivez votre besoin. L&apos;IA génère du contenu SEO optimisé en quelques secondes.
                </p>
              </Card>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === "user" ? (
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-lg">
                        {msg.task && (
                          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1 text-right">
                            {tasks.find((t) => t.id === msg.task)?.label}
                          </p>
                        )}
                        <div className="bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl rounded-tr-sm px-5 py-3.5">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-slate-500" />
                      </div>
                      <Card className="flex-1 p-5 lg:p-6">
                        <MarkdownRenderer content={msg.content} />
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <CopyButton text={msg.content} />
                        </div>
                      </Card>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-slate-500" />
                </div>
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
                    <span className="text-sm text-slate-400">L&apos;agent SEO réfléchit...</span>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <Card className="p-4 sticky bottom-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              {selectedTask === "optimize" ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={currentTask.placeholder}
                  rows={3}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  disabled={loading}
                />
              ) : (
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={currentTask.placeholder}
                  className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  disabled={loading}
                />
              )}
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 rounded-xl font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60 shrink-0 self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
