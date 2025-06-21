import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Changed from Sparkles to Mail
import { useState } from "react";
import { useScrollContext } from "@/lib/scroll-context";
import logo from "/logo.svg";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { setDisableAutoScroll } = useScrollContext();

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href") || "";
    const element = document.querySelector(targetId);
    setDisableAutoScroll(true);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-background/80 backdrop-blur-lg border-b border-white/10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Viro AI Logo"
            className="h-8 w-auto" 
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#faq"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Common Questions
          </a>

          <a
            href="#pricing"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#waitlist"
            onClick={handleNavigationClick}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Waitlist
          </a>
        </nav>

        <Button
          asChild
          variant="outline"
          className="flex items-center space-x-1 px-3 py-2 rounded-full border bg-[#201c1c] border-[#201c1c] text-gray-400 hover:bg-[#282424] hover:text-gray-40"
        >
          <a
            href="mailto:service.viroai@gmail.com"
            onClick={() => setDisableAutoScroll(true)}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
