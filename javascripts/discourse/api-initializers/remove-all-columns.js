import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.34", (api) => {
  api.registerValueTransformer("topic-list-columns", ({ value: columns }) => {
    // Remove all core columns
    columns.delete("posters");   // Avatar images
    columns.delete("likes");     // Like count
    columns.delete("replies");   // Number of replies
    columns.delete("views");     // Number of views
    columns.delete("activity");  // Last activity timestamp

    return columns;
  });
});
