import { apiInitializer } from "discourse/lib/api";

// Custom column to show if the topic author is staff
const StaffHeaderCell = {
  name: "created-by-staff-header",
  template: `<th>Staff?</th>`,
};

const StaffItemCell = {
  name: "created-by-staff-item",
  template: `<td>{{if @topic.creator.staff "✅"}}</td>`,
};

export default apiInitializer("1.34", (api) => {
  const discoveryService = api.container.lookup("service:discovery");

  api.registerValueTransformer("topic-list-columns", ({ value: columns }) => {
    // Example: remove poster avatars
    columns.delete("posters");

    // Example: move views column before replies
    columns.reposition("views", { before: "replies" });

    // Example: only add custom column in specific category
    if (discoveryService.category?.slug === "announcements") {
      columns.add("created-by-staff", {
        header: StaffHeaderCell,
        item: StaffItemCell,
      });
    }

    return columns;
  });
});
