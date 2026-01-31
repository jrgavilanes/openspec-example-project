import { z } from "zod";

export const CreatePartidoSchema = z.object({
  action: z.literal("create"),
  name: z.string().min(1, "Name is required"),
});

export const DeletePartidoSchema = z.object({
  action: z.literal("delete"),
  id: z.string().uuid("Invalid UUID format"),
});

export const VotePartidoSchema = z.object({
  action: z.literal("vote"),
  id: z.string().uuid("Invalid UUID format"),
});

export const PartidoActionSchema = z.discriminatedUnion("action", [
  CreatePartidoSchema,
  DeletePartidoSchema,
  VotePartidoSchema,
]);

export type PartidoAction = z.infer<typeof PartidoActionSchema>;
