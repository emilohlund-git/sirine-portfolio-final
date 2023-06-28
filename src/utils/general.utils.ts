const truncate = (text: string, charLimit: number) => {
  return text.slice(0, charLimit) + "...";
}

export { truncate };

