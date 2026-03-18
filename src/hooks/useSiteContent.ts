import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export const useSiteContent = (page: string, sectionKey: string) => {
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("page", page)
      .eq("section_key", sectionKey)
      .maybeSingle();

    if (data?.content) {
      setContent(data.content as Record<string, any>);
    }
    setLoading(false);
  }, [page, sectionKey]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, refetch: fetchContent };
};

export const useAllSiteContent = (page: string) => {
  const [content, setContent] = useState<Record<string, Record<string, any>>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .eq("page", page);

    if (data) {
      const mapped: Record<string, Record<string, any>> = {};
      data.forEach((row) => {
        mapped[row.section_key] = row.content as Record<string, any>;
      });
      setContent(mapped);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, refetch: fetchContent };
};

export const saveSiteContent = async (
  page: string,
  sectionKey: string,
  content: Record<string, any>,
  userId: string
) => {
  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page,
        section_key: sectionKey,
        content: content as unknown as Json,
        updated_by: userId,
      },
      { onConflict: "page,section_key" }
    );

  return { error };
};
