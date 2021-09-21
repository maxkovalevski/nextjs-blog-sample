interface PostData { date?: string | null; public?: boolean; };

export const isPublished = ({ date, public: isPublic = false }: PostData): boolean => {
  if (!date || !isPublic) {
    return false;
  }

  const dateTimestamp = new Date(date || '').getTime();
  const currentTimestamp = new Date().getTime();

  return dateTimestamp <= currentTimestamp;
}

