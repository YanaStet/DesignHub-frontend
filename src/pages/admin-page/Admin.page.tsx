import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { ManageUserTable } from "./user-table/ManageUserTable";
import { ManageReportTable } from "./report-table/ManageReportTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn-ui/ui/tabs";
import { ManageDesignTable } from "./design-table/ManageDesignTable";

export function AdminPage() {
  return (
    <div className="px-15 py-10">
      <Typography variant="h1" className="text-white mb-10">Admin Page</Typography>
      <Tabs defaultValue="reports">
        <TabsList variant="line" className="mb-4">
          <TabsTrigger value="reports" className="text-lg text-white hover:text-gray-300 data-[state=active]:text-gray-400 after:bg-gray-400">Reports</TabsTrigger>
          <TabsTrigger value="users" className="text-lg text-white hover:text-gray-300 data-[state=active]:text-gray-400 after:bg-gray-400">Users</TabsTrigger>
          <TabsTrigger value="designs" className="text-lg text-white hover:text-gray-300 data-[state=active]:text-gray-400 after:bg-gray-400">Designs</TabsTrigger>
        </TabsList>
        <TabsContent value="reports">
          <ManageReportTable />
        </TabsContent>
        <TabsContent value="users">
          <ManageUserTable />
        </TabsContent>
        <TabsContent value="designs">
          <ManageDesignTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
