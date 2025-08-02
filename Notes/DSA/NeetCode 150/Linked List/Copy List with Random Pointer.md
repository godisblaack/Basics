Link: https://leetcode.com/problems/copy-list-with-random-pointer/description/

I was not able to solve it.

**Brute force - Using Index Lookup**

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head)
            return nullptr;

        vector<Node*> original;
        Node* curr = head;
        
        while (curr) {
            original.push_back(curr);
            curr = curr->next;
        }

        vector<Node*> copy;
        for (Node* node : original)
            copy.push_back(new Node(node->val));

        for (size_t i = 0; i < original.size(); ++i) {
            if (i + 1 < original.size())
                copy[i]->next = copy[i + 1];
            if (original[i]->random) {
                auto it = find(original.begin(), original.end(),
                                    original[i]->random);
                copy[i]->random = copy[it - original.begin()];
            }
        }

        return copy[0];
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(N)

**Better Approach - Using Hash Map**

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head)
            return nullptr;

        std::unordered_map<Node*, Node*> mp;
        Node* curr = head;

        while (curr) {
            mp[curr] = new Node(curr->val);
            curr = curr->next;
        }

        curr = head;
        while (curr) {
            mp[curr]->next = mp[curr->next];
            mp[curr]->random = mp[curr->random];
            curr = curr->next;
        }

        return mp[head];
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Optimized solution**

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head)
            return nullptr;

        Node* curr = head;
        while (curr) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }

        curr = head;
        while (curr) {
            if (curr->random)
                curr->next->random = curr->random->next;
            curr = curr->next->next;
        }

        curr = head;
        Node* copyHead = head->next;
        while (curr) {
            Node* copy = curr->next;
            curr->next = copy->next;
            if (copy->next)
                copy->next = copy->next->next;
            curr = curr->next;
        }

        return copyHead;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)