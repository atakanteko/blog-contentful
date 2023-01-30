import { MantineProvider } from "@mantine/core";
import AppShellLayout from "./AppSheel";

function MantineProviderHoc({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShellLayout>{children}</AppShellLayout>
    </MantineProvider>
  );
}

export default MantineProviderHoc;
