import { SystemDesignProblem } from '../types';

export const SYSTEM_DESIGN_PROBLEMS: SystemDesignProblem[] = [
  {
    id: 'url-shortener',
    title: 'Design TinyURL / Distributed URL Shortener',
    difficulty: 'medium',
    description: 'Design a scalable, highly available URL shortening service similar to TinyURL or Bitly that can generate unique 7-character short keys, redirect users with low latency, and store custom aliases and analytics.',
    functionalRequirements: [
      'Given a long URL, generate a shorter and unique alias (e.g. https://tiny.cc/abc1234)',
      'When users access the short link, redirect them to original URL (301 vs 302 redirect)',
      'Custom link aliases and optional TTL expiry',
      'Real-time click analytics (referrer, country, timestamp)'
    ],
    nonFunctionalRequirements: [
      'High Availability (99.999% uptime for redirection)',
      'Low Latency (< 20ms redirection time)',
      'Read-heavy traffic (100:1 read to write ratio)',
      'Short URLs should not be easily guessable/enumerable'
    ],
    trafficEstimates: {
      dailyActiveUsers: '10 Million DAU',
      readWriteRatio: '100:1 (100M reads/day, 1M writes/day)',
      bandwidthRequirement: '~15 MB/s ingress, ~1.5 GB/s egress',
      storage5Years: '~30 Billion records total (approx. 15 TB storage)'
    },
    suggestedComponents: [
      'Client / Browser / Mobile App',
      'Global Anycast DNS + CDN (Cloudflare / CloudFront)',
      'Layer 7 Load Balancer (Nginx / Envoy)',
      'API Gateway & Distributed Rate Limiter',
      'URL Encoding / Key Generation Service (Base62 + Pre-generated KGS Range Token)',
      'Distributed In-Memory Cache (Redis Cluster with LRU Eviction)',
      'Primary Data Store (NoSQL Key-Value / DynamoDB / Cassandra with Partition Key = ShortURL)',
      'Event Stream / Message Queue (Apache Kafka)',
      'Analytics Processor (Apache Flink / Spark Streaming -> ClickHouse)'
    ],
    keyTradeOffs: [
      'Base62 Encoding vs MD5/SHA256 with Collision Resolution vs Range-based Token Server (Zookeeper/KGS)',
      '301 Permanent Redirect (browser caches redirect, saves server traffic, but loses click analytics) vs 302 Temporary Redirect (hits server every time, tracks analytics, slightly higher load)',
      'Cache eviction strategy (LRU 80/20 rule: caching 20% hot links satisfies 80% traffic)'
    ]
  },
  {
    id: 'video-streaming',
    title: 'Design YouTube / Netflix Video Platform',
    difficulty: 'hard',
    description: 'Design a global-scale video sharing platform that supports high-resolution video uploading, distributed asynchronous video transcoding into multiple resolutions/bitrates, and ultra-fast adaptive bitrate streaming (HLS/DASH).',
    functionalRequirements: [
      'Upload video files (support resumable uploads for 4K/8K content)',
      'Transcode uploaded raw videos into multiple formats (1080p, 720p, 480p) using H.264/AV1/VP9',
      'Smooth streaming with Adaptive Bitrate Streaming (HLS / DASH)',
      'Search videos by title/tags, like/comment, and view count tracking'
    ],
    nonFunctionalRequirements: [
      'Global low-latency video playback without buffering',
      'High storage durability (videos must never be lost)',
      'High availability for playback services (AP in CAP)',
      'Scalable to 100M+ concurrent video streams'
    ],
    trafficEstimates: {
      dailyActiveUsers: '2 Billion Monthly Active Users',
      readWriteRatio: '1000:1 Playback to Upload ratio',
      bandwidthRequirement: '100+ Terabits per second egress at peak',
      storage5Years: '500+ Petabytes of encoded media chunks'
    },
    suggestedComponents: [
      'Client with Adaptive Bitrate Video Player',
      'Edge CDN Points of Presence (PoPs)',
      'Chunked Multi-part Blob Storage (Amazon S3 / GCS)',
      'Distributed Transcoding Worker Fleet (GPU-accelerated workers via Celery / Kubernetes)',
      'Message Queue / Task Coordinator (RabbitMQ / Kafka)',
      'Metadata & User Database (Distributed PostgreSQL / CockroachDB)',
      'Search Engine (Elasticsearch / OpenSearch Cluster)',
      'Real-time View Counter (Redis Distributed HyperLogLog / Sliding Window Batch Aggregator)'
    ],
    keyTradeOffs: [
      'Pre-transcoding all resolutions vs Just-in-Time dynamic transcoding for rare long-tail videos',
      'CDN Caching costs vs Origin Server Bandwidth',
      'Strong consistency for comments/metadata vs Eventual consistency for view counts'
    ]
  },
  {
    id: 'distributed-cache',
    title: 'Design a Distributed Cache (Memcached / Redis)',
    difficulty: 'hard',
    description: 'Design a distributed, highly available, low-latency in-memory key-value caching system supporting atomic operations, TTL expiry, eviction policies, and cluster rebalancing with Consistent Hashing.',
    functionalRequirements: [
      'put(key, value, ttl) and get(key) with sub-millisecond p99 latency',
      'Automatic key expiration based on TTL',
      'Configurable eviction policies (LRU, LFU, FIFO)',
      'Dynamic scaling / node addition without downtime'
    ],
    nonFunctionalRequirements: [
      'Ultra low latency (< 1ms read/write)',
      'High Availability with Master-Replica replication & failover',
      'Horizontal scalability via Consistent Hashing',
      'Fault tolerance and automatic heartbeats'
    ],
    trafficEstimates: {
      dailyActiveUsers: 'Internal Service Infrastructure',
      readWriteRatio: '50:1 Read to Write ratio',
      bandwidthRequirement: '10 Gbps per storage node',
      storage5Years: 'Terabytes of pooled RAM across 64 nodes'
    },
    suggestedComponents: [
      'Client SDK with Consistent Hashing & Murmur3 Hash Ring',
      'Virtual Node Router to prevent data skew',
      'In-Memory Storage Engine with Memory Pool Allocator (Slab Allocator)',
      'Active & Passive TTL Sweeper Threads',
      'Gossip Protocol / Zookeeper for Cluster Node Membership & Failure Detection',
      'Append-Only File (AOF) & Periodic Snapshot Engine for Durability'
    ],
    keyTradeOffs: [
      'Single-threaded event loop (Redis style) vs Multi-threaded locked slabs (Memcached style)',
      'Synchronous replication (high consistency, higher latency) vs Asynchronous replication (low latency, possible data loss on failover)',
      'Cache-aside vs Read-Through / Write-Through / Write-Back caching strategies'
    ]
  }
];
