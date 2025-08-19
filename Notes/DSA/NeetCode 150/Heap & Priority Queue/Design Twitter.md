Link: https://leetcode.com/problems/design-twitter/description/

I was not able to solve it. I was not able to pass all the test cases.

**Priority queue solution**

```cpp
class Twitter {
private:
    int time = 0;
    unordered_map<int, unordered_set<int>> followers;
    unordered_map<int, vector<pair<int, int>>> userTweets; // userId -> list of {timestamp, tweetId}

public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        userTweets[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        priority_queue<pair<int, int>> pq;

        // Add user's own tweets
        for (auto& tweet : userTweets[userId]) {
            pq.push(tweet);
        }

        // Add tweets from followees
        for (int followeeId : followers[userId]) {
            for (auto& tweet : userTweets[followeeId]) {
                pq.push(tweet);
            }
        }

        // Get top 10 most recent tweets
        vector<int> feed;
        while (!pq.empty() && feed.size() < 10) {
            feed.push_back(pq.top().second);
            pq.pop();
        }

        return feed;
    }

    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followers[followerId].insert(followeeId);
        }
    }

    void unfollow(int followerId, int followeeId) {
        followers[followerId].erase(followeeId);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter* obj = new Twitter();
 * obj->postTweet(userId,tweetId);
 * vector<int> param_2 = obj->getNewsFeed(userId);
 * obj->follow(followerId,followeeId);
 * obj->unfollow(followerId,followeeId);
 */
 ```

**Time complexities:** O(k log k), where k is the total number of tweets from the user and their followees.

**Space complexity:** O(n) + O(u * f) + O(k) = O(n + u * f)

| Structure        | Space Complexity | Explanation                          |
|------------------|------------------|--------------------------------------|
| `userTweets`     | O(n)             | Stores all tweets ever posted        |
| `followers`      | O(u * f)         | Each user can follow multiple users  |
| `priority_queue` | O(k)             | Stores up to k tweets during feed retrieval |


**Optimized solution**

```cpp
class Twitter {
private:
    int time = 0;

    unordered_map<int, unordered_set<int>> followers;
    unordered_map<int, vector<pair<int, int>>> userTweets;

public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        userTweets[userId].push_back({time++, tweetId});
        followers[userId].insert(userId); // Ensure user follows themselves
    }

    vector<int> getNewsFeed(int userId) {
        // Min-heap to keep top 10 most recent tweets
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap;

        for (int followeeId : followers[userId]) {
            for (auto& tweet : userTweets[followeeId]) {
                minHeap.push(tweet);
                if (minHeap.size() > 10) {
                    minHeap.pop(); // Remove oldest tweet
                }
            }
        }

        // Extract tweets from heap into reverse order
        vector<int> feed;
        while (!minHeap.empty()) {
            feed.push_back(minHeap.top().second);
            minHeap.pop();
        }

        reverse(feed.begin(), feed.end()); // Most recent first
        return feed;
    }

    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followers[followerId].insert(followeeId);
        }
    }

    void unfollow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followers[followerId].erase(followeeId);
        }
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter* obj = new Twitter();
 * obj->postTweet(userId,tweetId);
 * vector<int> param_2 = obj->getNewsFeed(userId);
 * obj->follow(followerId,followeeId);
 * obj->unfollow(followerId,followeeId);
 */
 ```

**Time complexity:** O(k log 10) = O(k)

**Space complexity:** O(n + u * f)