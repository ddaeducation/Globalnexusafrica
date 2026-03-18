import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

/** Fetch a single section, merge with defaults */
export const useSiteContent = <T extends Record<string, any>>(
  page: string,
  sectionKey: string,
  defaults: T
): { data: T; loading: boolean } => {
  const [data, setData] = useState<T>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: row } = await supabase
        .from("site_content")
        .select("content")
        .eq("page", page)
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (row?.content && typeof row.content === "object") {
        setData({ ...defaults, ...(row.content as Record<string, any>) } as T);
      }
      setLoading(false);
    };
    fetch();
  }, [page, sectionKey]);

  return { data, loading };
};

/** Fetch all sections for a page, keyed by section_key */
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

/** Helper: get value from content map with fallback */
export const getContent = <T>(
  content: Record<string, Record<string, any>>,
  section: string,
  key: string,
  fallback: T
): T => {
  return (content[section]?.[key] as T) ?? fallback;
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
