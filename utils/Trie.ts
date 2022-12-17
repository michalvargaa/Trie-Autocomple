class TrieNode {
  public c: string;
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  public constructor(c: string) {
    this.children = new Map<string, TrieNode>();
    this.c = c;
    this.isEndOfWord = false;
  }
}
export class Trie {
  private root: TrieNode;
  private words: string[];

  public constructor(words: string[]) {
    this.root = new TrieNode('');
    this.words = words;
    for (let word of words) {
      this.insert(word);
    }
  }

  public insert(word: string): void {
    if (word == '') return;

    let current: TrieNode = this.root;
    word.split('').map((letter: string) => {
      if (!current.children.has(letter)) {
        current.children.set(letter, new TrieNode(letter));
      }
      current = current.children.get(letter)!;
    });

    current.isEndOfWord = true;
  }

  public searchPrefix(word: string): TrieNode | null {
    let current: TrieNode = this.root;
    for (let letter of [...word]) {
      if (current.children.get(letter) == null) return null;
      else current = current.children.get(letter)!;
    }
    return current;
  }

  public suggestHelper(root: TrieNode, list: string[], curr: string): void {
    if(root) {
        if (root.isEndOfWord) {
            list.push(curr);
          }
          if((root.children == null || root.children.size == 0)) return;
          
      
          for (let child of root.children.values()) {
            this.suggestHelper(child, list, `${curr}${child.c}`);
            
            
          }
    }
    
  }
  public suggest(prefix: string): string[] {
    let list: string[] = [];
    let parent: TrieNode = this.searchPrefix(prefix)!;
    let curr: string = prefix;

    this.suggestHelper(parent, list, curr);
    return list;
  }
}
