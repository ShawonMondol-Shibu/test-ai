import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StreamPage from "./ui/stream/page";
import CompletionPage from "./ui/completion/page";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-8">
        Welcome to the AI LOL content Generator
      </h1>

      <Tabs className={'flex flex-col items-center justify-center'}>
        <TabsList>
          <TabsTrigger value="completion" className={'text-md'}>Completion Chat</TabsTrigger>
          <TabsTrigger value="Stream" className={'text-md'}>Stream Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="completion" className={''}>
          <CompletionPage />
        </TabsContent>
        <TabsContent value="Stream">
          <StreamPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
