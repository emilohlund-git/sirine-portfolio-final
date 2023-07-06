declare module 'colorthief';

interface DatabaseBase {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
}

interface ProjectMedia extends DatabaseBase {
  embed_src?: string;
  media?: string;
  type: 'image' | 'embed' | 'pdf' | 'video';
}

interface ProjectMediaContent extends DatabaseBase {
  content: string;
  expand: {
    media: ProjectMedia[];
  }
}

interface ProjectType extends DatabaseBase {
  about: string;
  cover_image: string;
  key_insights: string;
  orientation: 'left' | 'right';
  potential_solution: string;
  problem: string;
  gallery: string[];
  image: string;
  processes: string[];
  tools: string[];
  roles: string[];
  title: string;
  slogan: string;
  research_goals: string;
  expand: {
    affinity_map: ProjectMedia;
    brand_colors: ProjectMediaContent;
    colors: {
      collectionId: string;
      collectionName: string;
      created: string;
      updated: string;
      id: string;
      project_theme_color: string;
    }
    findings: ProjectMedia[];
    font_family: ProjectMedia[];
    high_fidelity_mock_ups: ProjectMedia[];
    iconography: ProjectMediaContent[];
    interactive_prototype: ProjectMedia;
    logo: ProjectMediaContent;
    navigation_map: ProjectMedia;
    persona: ProjectMedia;
    primary_research: ProjectMediaContent[];
    secondary_research: ProjectMediaContent[];
    user_flow: ProjectMedia;
    user_scenario: ProjectMedia;
  }
}
