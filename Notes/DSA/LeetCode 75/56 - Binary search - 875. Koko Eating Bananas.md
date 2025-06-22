Link: https://leetcode.com/problems/koko-eating-bananas/description/

**My solution (brute force)**

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        for (float bananasPerHour = 1; bananasPerHour <= INT_MAX; bananasPerHour++) {
            long long int totalHours = 0;

            for (int i = 0; i < piles.size(); i++) {
                totalHours += ceil(static_cast<float>(piles[i] / bananasPerHour));
            }

            if (totalHours <= h) {
                return bananasPerHour;
            } else if (totalHours < h && bananasPerHour == 1) {
                return 1;
            }

            // The else if condition is unreachable, forgot to notice before submitting.
        }

        return 0;
    }
};
```

**Time complexity:** O(M N)

**Space complexity:** O(1)

This is **not** the optimized solution. I was directly working on the optimized solution with binary search, but I was getting stuck with the if/else logic, then I decided to do the brute force, it helped me simplify the if/else logic in the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int bananasPerHour = 1;

        int minBananasPerHour = 1;
        int maxBananasPerHour = *max_element(piles.begin(), piles.end());

        while (minBananasPerHour <= maxBananasPerHour) {
            long long int totalHours = 0;

            int midBananasPerHour = minBananasPerHour + (maxBananasPerHour - minBananasPerHour) / 2;

            for (int i = 0; i < piles.size(); i++) {
                totalHours += ceil(static_cast<double>(piles[i]) / midBananasPerHour);
            }

            if (totalHours < h && midBananasPerHour == 1) {
                return 1;
            } else if (totalHours <= h) {
                bananasPerHour = midBananasPerHour;

                maxBananasPerHour = midBananasPerHour - 1;
            } else if (totalHours > h) { // This line can be just "else".
                minBananasPerHour = midBananasPerHour + 1;
            }
        }

        return bananasPerHour;
    }
};
```

**Time complexity:** O(N log M), where N is the number of piles and M is the maximum value in the piles array.

**Space complexity:** O(1)

I was not able to pass the test case for the input, where piles = [1000000000], and h = 2. I was using float while type casting at totalHours += ceil(static_cast<double>(piles[i]) / midBananasPerHour);, due to the precision error in float the test case was failing. **Note:** In the problem where it is needed to do type casting for floating point number, always go with double.

**Fastest cpp solution for this problem by Gemini**

```cpp
#include <vector>
#include <algorithm> // For std::max and std::min
#include <cmath>     // For std::ceil

class Solution {
public:
    // Function to check if Koko can eat all bananas within 'h' hours at a given speed 'k'
    bool canEat(const std::vector<int>& piles, int h, int k) {
        long long hoursNeeded = 0;
        for (int pile : piles) {
            // Calculate hours needed for the current pile.
            // Using ceil(pile / k) ensures that even if pile is not perfectly divisible by k,
            // Koko still takes a full hour for the remaining bananas.
            // For example, if pile = 7 and k = 3, ceil(7/3) = ceil(2.33) = 3 hours.
            hoursNeeded += (pile + k - 1) / k; // Equivalent to ceil(pile / k) for positive integers
            if (hoursNeeded > h) {
                return false; // If hours needed exceed 'h', Koko cannot finish
            }
        }
        return true; // Koko can finish within 'h' hours
    }

    int minEatingSpeed(std::vector<int>& piles, int h) {
        // The minimum possible eating speed is 1 (Koko eats 1 banana per hour).
        // The maximum possible eating speed is the size of the largest pile (Koko eats the largest pile in 1 hour).
        int left = 1;
        int right = 0;
        for (int pile : piles) {
            right = std::max(right, pile);
        }

        int minSpeed = right; // Initialize with the maximum possible speed as a fallback

        // Perform binary search to find the minimum eating speed
        while (left <= right) {
            int mid = left + (right - left) / 2; // Calculate mid to avoid potential overflow

            if (canEat(piles, h, mid)) {
                // If Koko can eat at 'mid' speed, it means 'mid' is a possible answer.
                // We try to find an even smaller speed, so we store 'mid' and search in the left half.
                minSpeed = mid;
                right = mid - 1;
            } else {
                // If Koko cannot eat at 'mid' speed, it means 'mid' is too slow.
                // We need a faster speed, so we search in the right half.
                left = mid + 1;
            }
        }

        return minSpeed; // Return the minimum speed found
    }
};

/*
Explanation:

1.  **Problem Understanding:**
    Koko needs to eat all bananas from `piles` within `h` hours. She can choose an eating speed `k`. For each pile, the time taken is `ceil(pile / k)`. We need to find the minimum integer `k` that allows her to finish within `h` hours.

2.  **Search Space for `k`:**
    * **Minimum `k`:** Koko must eat at least 1 banana per hour, so `k` cannot be less than 1.
    * **Maximum `k`:** In the worst case, Koko might have to eat the largest pile in 1 hour. So, the maximum possible `k` is the value of the largest pile. If `k` is greater than the largest pile, it's effectively the same as `k` being equal to the largest pile for that specific pile (it will still take 1 hour).
    * This defines a search space for `k` from `1` to `max(piles)`.

3.  **Binary Search Approach:**
    * The `canEat` function is **monotonic**. If Koko can eat all bananas at speed `k`, she can also eat them at any speed `k' > k`. This property makes binary search applicable.
    * We use binary search on the possible values of `k` (from `1` to `max(piles)`).
    * `left` pointer starts at 1.
    * `right` pointer starts at `max(piles)`.
    * `minSpeed` stores the best (minimum) `k` found so far that satisfies the condition.

4.  **`canEat(piles, h, k)` Function:**
    * This helper function simulates Koko eating at speed `k`.
    * It iterates through each `pile`.
    * For each `pile`, it calculates the hours needed: `(pile + k - 1) / k`. This is an efficient way to compute `ceil(pile / k)` for positive integers.
        * Example: `pile = 7, k = 3`
            * `(7 + 3 - 1) / 3 = 9 / 3 = 3` (correct, `ceil(7/3) = 3`)
        * Example: `pile = 6, k = 3`
            * `(6 + 3 - 1) / 3 = 8 / 3 = 2` (integer division, correct, `ceil(6/3) = 2`)
    * It sums up the `hoursNeeded` for all piles.
    * If `hoursNeeded` ever exceeds `h`, it immediately returns `false` because Koko cannot finish.
    * If all piles are processed and `hoursNeeded` is less than or equal to `h`, it returns `true`.

5.  **Main `minEatingSpeed` Function Logic:**
    * Initialize `left = 1` and `right = max(piles)`.
    * Initialize `minSpeed = right` (a valid but potentially not optimal answer).
    * **While `left <= right`:**
        * Calculate `mid = left + (right - left) / 2` to prevent integer overflow.
        * **Call `canEat(piles, h, mid)`:**
            * **If `true` (Koko can eat at `mid` speed):**
                * This `mid` is a potential answer. We record it in `minSpeed`.
                * Since we are looking for the *minimum* speed, we try to find an even smaller speed by searching in the left half: `right = mid - 1`.
            * **If `false` (Koko cannot eat at `mid` speed):**
                * `mid` is too slow. We need a faster speed.
                * Search in the right half: `left = mid + 1`.
    * Finally, `minSpeed` will hold the smallest `k` that satisfies the condition.

**Time Complexity:**
* Finding `max(piles)`: O(N), where N is the number of piles.
* Binary search: `log(MaxPileValue)` iterations.
* Inside each iteration, `canEat` takes O(N) time.
* Total time complexity: **O(N * log(MaxPileValue))**.

**Space Complexity:**
* **O(1)**, as we only use a few variables.
*/
```

**Time complexity:** O(N log M), where N is the number of piles and M is the maximum value in the piles array.

**Space complexity:** O(1)

**Note:** This solution is faster because of the use of the **integer arithmetic trick (pile + k - 1) / k** for **ceiling division**, which avoids slower floating-point operations.