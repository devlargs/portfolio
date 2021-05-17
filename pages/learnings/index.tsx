import { Box } from "@chakra-ui/react";
import { globalStyles } from "styles/global";
import Featured from "components/Featured";
import LatestPosts from "components/LatestPosts";

export default function TIL() {
  return (
    <Box mt={globalStyles.container.marginTop}>
      <Box
        d={{
          base: "inherit",
          md: "flex",
        }}
      >
        <Box flex="1">
          <Featured />
        </Box>
        <Box
          width={{
            lg: "400px",
          }}
        >
          <LatestPosts />
        </Box>
      </Box>
    </Box>
  );
}
