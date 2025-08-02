Link: https://leetcode.com/problems/lru-cache/description/

I was not able to solve it.

**Brute force**

```cpp
class LRUCache {
    int cap;
    vector<pair<int, int>> cache;

public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache[i].first == key) {
                int value = cache[i].second;
                // Move to end (most recently used)
                cache.erase(cache.begin() + i);
                cache.push_back({key, value});
                return value;
            }
        }
        return -1;
    }

    void put(int key, int value) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache[i].first == key) {
                cache.erase(cache.begin() + i);
                break;
            }
        }
        if (cache.size() == cap) {
            cache.erase(cache.begin()); // remove least recently used
        }
        cache.push_back({key, value}); // most recently used at the end
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
 ```

 **Time complexity:** O(N)

 **Space complexity:** O(capacity)

 **Better solution**

 ```cpp
 class LRUCache {
    int cap;
    list<pair<int, int>> lru;
    unordered_map<int, list<pair<int, int>>::iterator> cache;

public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        auto it = cache[key];
        int val = it->second;
        lru.erase(it);
        lru.push_front({key, val});
        cache[key] = lru.begin();
        return val;
    }

    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            lru.erase(cache[key]);
        } else if (lru.size() == cap) {
            auto old = lru.back();
            cache.erase(old.first);
            lru.pop_back();
        }
        lru.push_front({key, value});
        cache[key] = lru.begin();
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
 ```

 **Time complexity:** O(1)

 **Space complexity:** O(capacity)

 **Optimized solution**

 ```cpp
 class Node {
public:
    int key, value;
    Node* prev;
    Node* next;
    Node(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    unordered_map<int, Node*> cache;
    int cap;
    Node* head;
    Node* tail;

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void insert(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        Node* node = cache[key];
        remove(node);
        insert(node);
        return node->value;
    }

    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            remove(cache[key]);
            delete cache[key];
        } else if (cache.size() == cap) {
            Node* lru = tail->prev;
            remove(lru);
            cache.erase(lru->key);
            delete lru;
        }
        Node* node = new Node(key, value);
        insert(node);
        cache[key] = node;
    }

    ~LRUCache() {
        for (auto& p : cache) delete p.second;
        delete head;
        delete tail;
    }
};
```

**Time complexity:** O(1)

**Space complexity:** O(capacity)