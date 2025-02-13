export { HashMap };

class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  pairs = 0;
  buckets = [];

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    const hashKey = this.hash(key);

    // Add new hashKey bucket, should it not exist
    if (!this.buckets[hashKey]) {
      this.buckets[hashKey] = [];
    }

    // Handle existing entry in bucket, by overwriting the value
    for (let pair of this.buckets[hashKey]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    // Push the new key value pair if it doesn't exist, and update values
    this.buckets[hashKey].push([key, value]);
    this.pairs++;

    if (this.pairs / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    this.capacity *= 2;
    const newBuckets = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          const newHashKey = this.hash(pair[0]);
          if (!newBuckets[newHashKey]) {
            newBuckets[newHashKey] = [];
          }
          newBuckets[newHashKey].push(pair);
        }
      }
    }

    this.buckets = newBuckets;
  }

  get(key) {
    const hashKey = this.hash(key);
    let value = null;

    if (!this.buckets[hashKey]) {
      return value;
    }

    for (const pair of this.buckets[hashKey]) {
      if (pair[0] === key) value = pair[1];
    }
    return value;
  }

  has(key) {
    const hashKey = this.hash(key);

    if (!this.buckets[hashKey]) {
      return false;
    }

    for (const pair of this.buckets[hashKey]) {
      if (pair[0] === key) return true;
    }
    return false;
  }

  remove(key) {
    const hashKey = this.hash(key);

    if (!this.buckets[hashKey]) {
      return false;
    }

    for (const pair of this.buckets[hashKey]) {
      if (pair[0] === key) {
        const index = this.buckets[hashKey].indexOf(pair);
        this.buckets[hashKey].splice(index, 1);
        this.pairs--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.pairs;
  }

  clear() {
    this.buckets = [];
    this.pairs = 0;
  }

  keys() {
    if (this.pairs === 0) {
      return null;
    }

    const keyArray = [];

    this.buckets.forEach((value) => {
      value.forEach((value) => {
        keyArray.push(value[0]);
      });
    });
    return keyArray;
  }

  values() {
    if (this.pairs === 0) {
      return null;
    }

    const valueArray = [];

    this.buckets.forEach((value) => {
      value.forEach((value) => {
        valueArray.push(value[1]);
      });
    });
    return valueArray;
  }

  entries() {
    if (this.pairs === 0) {
      return null;
    }

    const valueArray = [];

    this.buckets.forEach((value) => {
      value.forEach((value) => {
        valueArray.push(value);
      });
    });
    return valueArray;
  }
}
