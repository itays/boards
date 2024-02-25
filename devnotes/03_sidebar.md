# Working on Sidebar

1. First I've enabled organizations in the Clerk dashboard, went to my application dashboard in clerk.dev, in the left pannel clicked on 'Organizations settings' and enabled the organizations feature.
   then I went to `JWT Templates', clicked on the 'convex' template I created in earlier steps and updated the `Claims`section to include`org_role`and`org_id` like so:

```json
{
  "org_role": "{{ user.org_role }}",
  "org_id": "{{ user.org_id }}"
}
```

2. Added 2 more components from shadcn-ui, dialog & tooltip. in terminal I run: `pnpx shadcn-ui@latest add dialog` & `pnpx shadcn-ui@latest add tooltip`, that installed a new components to my components/ui folder.

3. Created NewButton component in app/(dashboard)/\_components/NewButton.tsx, this button will be used to create new organizations, it's a simple button with a plus icon and a text. it's being rendered at <Sidebar/> component.
   also created <List> & <Item> components in the same folder, these components will be used to render the list of organizations in the sidebar. made some tweaks in the Clerk dashboard to make the organizations list more readable.

4. Created a Hint Component in app/(dashboard)/\_components/Hint.tsx, this component will show a tooltip when hovered over, it's being used in the <NewButton> component. and also in the <Item> component to show the organization name when hovered over.
