import { CodingProblem } from '../types';

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'Arrays & Hashing',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        explanation: 'Basic case with match at start'
      },
      {
        id: 'tc-2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        explanation: 'Match at non-zero index'
      },
      {
        id: 'tc-3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        explanation: 'Duplicates handling'
      },
      {
        id: 'tc-4',
        input: 'nums = [-1,-2,-3,-4,-5], target = -8',
        expectedOutput: '[2,4]',
        explanation: 'Negative integers'
      }
    ],
    hints: [
      'A brute force approach checks all pairs in O(N^2). Can we do better with auxiliary space?',
      'Can we use a Hash Map to look up the complement in O(1) time?'
    ],
    timeComplexityTarget: 'O(N)',
    spaceComplexityTarget: 'O(N)'
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    category: 'Sliding Window',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const charIndexMap = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
      left = charIndexMap.get(char) + 1;
    }
    charIndexMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    left = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char, int> map;
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); ++right) {
            if (map.find(s[right]) != map.end() && map[s[right]] >= left) {
                left = map[s[right]] + 1;
            }
            map[s[right]] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 's = "abcabcbb"',
        expectedOutput: '3'
      },
      {
        id: 'tc-2',
        input: 's = "bbbbb"',
        expectedOutput: '1'
      },
      {
        id: 'tc-3',
        input: 's = "pwwkew"',
        expectedOutput: '3'
      },
      {
        id: 'tc-4',
        input: 's = ""',
        expectedOutput: '0',
        explanation: 'Empty string base case'
      }
    ],
    hints: [
      'Use the sliding window technique with two pointers [left, right].',
      'Store the last seen index of each character to skip duplicate regions in O(1).'
    ],
    timeComplexityTarget: 'O(N)',
    spaceComplexityTarget: 'O(min(N, M))'
  },
  {
    id: 'lru-cache',
    title: 'Design LRU Cache',
    difficulty: 'hard',
    category: 'System & Data Structures',
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in **O(1)** average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); // returns 1; lRUCache.put(3, 3); // evicts key 2; lRUCache.get(2); // returns -1 (not found)'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    starterCode: {
      javascript: `class DLinkedNode {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.val = value;
      this._moveToHead(node);
    } else {
      const newNode = new DLinkedNode(key, value);
      this.map.set(key, newNode);
      this._addNode(newNode);
      if (this.map.size > this.capacity) {
        const tail = this._popTail();
        this.map.delete(tail.key);
      }
    }
  }

  _addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  _popTail() {
    const res = this.tail.prev;
    this._removeNode(res);
    return res;
  }
}`,
      python: `class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            new_node = DLinkedNode(key, value)
            self.cache[key] = new_node
            self._add_node(new_node)
            if len(self.cache) > self.capacity:
                removed = self._pop_tail()
                del self.cache[removed.key]

    def _add_node(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_node(node)

    def _pop_tail(self):
        res = self.tail.prev
        self._remove_node(res)
        return res`,
      cpp: `#include <unordered_map>

struct Node {
    int key, val;
    Node *prev, *next;
    Node(int k = 0, int v = 0) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int capacity;
    std::unordered_map<int, Node*> map;
    Node *head, *tail;

    void addNode(Node* node) {
        node->prev = head;
        node->next = head->next;
        head->next->prev = node;
        head->next = node;
    }

    void removeNode(Node* node) {
        Node* p = node->prev;
        Node* n = node->next;
        p->next = n;
        n->prev = p;
    }

public:
    LRUCache(int cap) : capacity(cap) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        Node* node = map[key];
        removeNode(node);
        addNode(node);
        return node->val;
    }

    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            Node* node = map[key];
            node->val = value;
            removeNode(node);
            addNode(node);
        } else {
            Node* newNode = new Node(key, value);
            map[key] = newNode;
            addNode(newNode);
            if (map.size() > capacity) {
                Node* lru = tail->prev;
                removeNode(lru);
                map.erase(lru->key);
                delete lru;
            }
        }
    }
};`,
      java: `import java.util.HashMap;

class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private final int capacity;
    private final HashMap<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        add(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            remove(node);
            add(node);
        } else {
            Node node = new Node(key, value);
            map.put(key, node);
            add(node);
            if (map.size() > capacity) {
                Node lru = tail.prev;
                remove(lru);
                map.remove(lru.key);
            }
        }
    }

    private void add(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'Capacity = 2, Operations: put(1,1), put(2,2), get(1), put(3,3), get(2)',
        expectedOutput: 'get(1)->1, get(2)-> -1',
        explanation: 'Key 2 was evicted because key 1 was recently accessed'
      },
      {
        id: 'tc-2',
        input: 'Capacity = 1, Operations: put(2,1), get(2), put(3,2), get(2), get(3)',
        expectedOutput: 'get(2)->1, get(2)-> -1, get(3)->2',
        explanation: 'Capacity 1 eviction edge case'
      }
    ],
    hints: [
      'Combine a Hash Map (for O(1) key lookups) with a Doubly Linked List (for O(1) node removals and insertions at the head).',
      'Use dummy head and tail sentinel nodes to simplify edge boundary insertions/deletions.'
    ],
    timeComplexityTarget: 'O(1) for both get and put',
    spaceComplexityTarget: 'O(Capacity)'
  }
];
