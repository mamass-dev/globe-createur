import {
  Globe,
  RefreshCw,
  Search,
  Building2,
  Zap,
  Camera,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Headphones,
  Mail,
  MapPin,
  Calendar,
  User,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Quote,
  Check,
  Hotel,
  PartyPopper,
  UtensilsCrossed,
  Hammer,
  Briefcase,
} from "lucide-react"

export const icons = {
  Globe,
  RefreshCw,
  Search,
  Building2,
  Zap,
  Camera,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Headphones,
  Mail,
  MapPin,
  Calendar,
  User,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Quote,
  Check,
  Hotel,
  PartyPopper,
  UtensilsCrossed,
  Hammer,
  Briefcase,
}

export type IconName = keyof typeof icons

export function LucideIcon({ 
  name, 
  className 
}: { 
  name: string, 
  className?: string 
}) {
  const Icon = icons[name as IconName]
  if (!Icon) return null
  return <Icon className={className} />
}
