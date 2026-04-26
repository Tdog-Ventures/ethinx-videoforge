import AuditQuestionnaire from "@/components/AuditQuestionnaire";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <AuditQuestionnaire />
    </main>
  );
};

export default Index;
