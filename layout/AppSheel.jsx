import { AppShell, Header } from "@mantine/core";
import { HeaderSimple } from "@/components/ui/Header";

function AppShellLayout({ children }) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <HeaderSimple />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default AppShellLayout;
