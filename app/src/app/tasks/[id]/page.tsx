import { getTaskAPI } from "@/api/tasks";
import { MessageSquare } from "lucide-react";
import { cookies } from "next/headers";

export default async function Task({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();

  const task = await getTaskAPI(id, undefined, {
    Cookie: await cookieStore.toString()
  });

  if (!task) {
    return <h1>Task not found</h1>;
  }

  return (
    <>
      <main className="">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div className="container max-w-screen-lg px-4 mx-auto sm:px-6 lg:px-8">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h2 className="mb-1 text-lg font-semibold text-foreground">
                    {task.title}
                  </h2>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Posted by {task.createdByUser?.username || 'Unknown'}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
