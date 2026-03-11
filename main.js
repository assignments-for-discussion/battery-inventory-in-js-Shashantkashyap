const assert = require('assert');

function countBatteriesByHealth(presentCapacities) {
  const ratedCapacity = 120;

  let healthy = 0;
  let exchange = 0;
  let failed = 0;

  presentCapacities.forEach(capacity => {
    const soh = (100 * capacity) / ratedCapacity;

    if (soh > 83 && soh <= 100) {
      healthy++;
    } else if (soh >= 63 && soh <= 83) {
      exchange++;
    } else {
      failed++;
    }
  });

  return {
    healthy,
    exchange,
    failed
  };
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);


  // Additional boundary tests
  assert.deepEqual(countBatteriesByHealth([120]), { healthy:1, exchange:0, failed:0 });
  assert.deepEqual(countBatteriesByHealth([76]), { healthy:0, exchange:1, failed:0 });
  assert.deepEqual(countBatteriesByHealth([50]), { healthy:0, exchange:0, failed:1 });
  assert.deepEqual(countBatteriesByHealth([99.6]), { healthy:0, exchange:1, failed:0 });
  console.log("Done counting :)");
}

testBucketingByHealth();
