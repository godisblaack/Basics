Link: https://leetcode.com/problems/word-ladder/description/

I was not able to solve it.

**Breadth First Search - I**

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (find(wordList.begin(), wordList.end(), endWord) == wordList.end() ||
            beginWord == endWord) {
            return 0;
        }

        int n = wordList.size();
        int m = wordList[0].size();
        vector<vector<int>> adj(n);
        unordered_map<string, int> mp;
        for (int i = 0; i < n; i++) {
            mp[wordList[i]] = i;
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int cnt = 0;
                for (int k = 0; k < m; k++) {
                    if (wordList[i][k] != wordList[j][k]) {
                        cnt++;
                    }
                }
                if (cnt == 1) {
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }

        queue<int> q;
        int res = 1;
        unordered_set<int> visit;

        for (int i = 0; i < m; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == beginWord[i]) {
                    continue;
                }
                string word = beginWord.substr(0, i) + c + beginWord.substr(i + 1);
                if (mp.find(word) != mp.end() && visit.find(mp[word]) == visit.end()) {
                    q.push(mp[word]);
                    visit.insert(mp[word]);
                }
            }
        }

        while (!q.empty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int node = q.front();
                q.pop();
                if (wordList[node] == endWord) {
                    return res;
                }
                for (int nei : adj[node]) {
                    if (visit.find(nei) == visit.end()) {
                        visit.insert(nei);
                        q.push(nei);
                    }
                }
            }
        }

        return 0;
    }
};
```

**Time complexity:** O($n^{2} ∗ m$)

**Space complexity:** O($n^{2}$)

**Breadth First Search - II**

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        if (words.find(endWord) == words.end() || beginWord == endWord) return 0;
        int res = 0;
        queue<string> q;
        q.push(beginWord);

        while (!q.empty()) {
            res++;
            int len = q.size();
            for (int i = 0; i < len; i++) {
                string node = q.front();
                q.pop();
                if (node == endWord) return res;
                for (int j = 0; j < node.length(); j++) {
                    char original = node[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        node[j] = c;
                        if (words.find(node) != words.end()) {
                            q.push(node);
                            words.erase(node);
                        }
                    }
                    node[j] = original;
                }
            }
        }
        return 0;
    }
};
```

**Time complexity:** O($m^{2} ∗ n$)

**Space complexity:** O($m^{2} ∗ n$)

**Breadth First Search - III**

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (endWord.empty() || find(wordList.begin(), wordList.end(), endWord) == wordList.end()) {
            return 0;
        }

        unordered_map<string, vector<string>> nei;
        wordList.push_back(beginWord);
        for (const string& word : wordList) {
            for (int j = 0; j < word.size(); ++j) {
                string pattern = word.substr(0, j) + "*" + word.substr(j + 1);
                nei[pattern].push_back(word);
            }
        }

        unordered_set<string> visit{beginWord};
        queue<string> q;
        q.push(beginWord);
        int res = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                string word = q.front();
                q.pop();
                if (word == endWord) {
                    return res;
                }
                for (int j = 0; j < word.size(); ++j) {
                    string pattern = word.substr(0, j) + "*" + word.substr(j + 1);
                    for (const string& neiWord : nei[pattern]) {
                        if (visit.find(neiWord) == visit.end()) {
                            visit.insert(neiWord);
                            q.push(neiWord);
                        }
                    }
                }
            }
            ++res;
        }
        return 0;
    }
};
```

**Time complexity:** O($m^{2} ∗ n$)

**Space complexity:** O($m^{2} ∗ n$)

**Meet in the middle - BFS**

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (find(wordList.begin(), wordList.end(), endWord) == wordList.end() ||
            beginWord == endWord)
            return 0;
        int m = wordList[0].size();
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        queue<string> qb, qe;
        unordered_map<string, int> fromBegin, fromEnd;
        qb.push(beginWord);
        qe.push(endWord);
        fromBegin[beginWord] = 1;
        fromEnd[endWord] = 1;

        while (!qb.empty() && !qe.empty()) {
            if (qb.size() > qe.size()) {
                swap(qb, qe);
                swap(fromBegin, fromEnd);
            }
            int size = qb.size();
            for (int k = 0; k < size; k++) {
                string word = qb.front();
                qb.pop();
                int steps = fromBegin[word];
                for (int i = 0; i < m; i++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == word[i])
                            continue;
                        string nei = word.substr(0, i) +
                                     c + word.substr(i + 1);
                        if (!wordSet.count(nei))
                            continue;
                        if (fromEnd.count(nei))
                            return steps + fromEnd[nei];
                        if (!fromBegin.count(nei)) {
                            fromBegin[nei] = steps + 1;
                            qb.push(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
};
```

**Time complexity:** O($m^{2} ∗ n$)

**Space complexity:** O($m^{2} ∗ n$)