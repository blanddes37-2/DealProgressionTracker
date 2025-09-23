import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDealSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Deal routes
  app.get("/api/deals", async (_req, res) => {
    try {
      const deals = await storage.getDeals();
      res.json(deals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      res.status(500).json({ error: "Failed to fetch deals" });
    }
  });

  app.get("/api/deals/:id", async (req, res) => {
    try {
      const deal = await storage.getDeal(req.params.id);
      if (!deal) {
        return res.status(404).json({ error: "Deal not found" });
      }
      res.json(deal);
    } catch (error) {
      console.error("Error fetching deal:", error);
      res.status(500).json({ error: "Failed to fetch deal" });
    }
  });

  app.post("/api/deals", async (req, res) => {
    try {
      const parsed = insertDealSchema.safeParse(req.body);
      if (!parsed.success) {
        const error = fromZodError(parsed.error);
        return res.status(400).json({ error: error.message });
      }

      const deal = await storage.createDeal(parsed.data);
      res.status(201).json(deal);
    } catch (error) {
      console.error("Error creating deal:", error);
      res.status(500).json({ error: "Failed to create deal" });
    }
  });

  app.patch("/api/deals/:id", async (req, res) => {
    try {
      const parsed = insertDealSchema.partial().safeParse(req.body);
      if (!parsed.success) {
        const error = fromZodError(parsed.error);
        return res.status(400).json({ error: error.message });
      }

      const deal = await storage.updateDeal(req.params.id, parsed.data);
      res.json(deal);
    } catch (error) {
      console.error("Error updating deal:", error);
      res.status(500).json({ error: "Failed to update deal" });
    }
  });

  app.delete("/api/deals/:id", async (req, res) => {
    try {
      const success = await storage.deleteDeal(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Deal not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting deal:", error);
      res.status(500).json({ error: "Failed to delete deal" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
