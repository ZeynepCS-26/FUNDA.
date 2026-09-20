### 3. Vercel Portfolyo CI/CD Mimari Şeması

```mermaid
graph LR
    A[Yerel Geliştirme<br/>HTML, CSS, JS] -->|Git Push| B( GitHub Reposu)
    B -->|Tetikleme / CI-CD| C{ Vercel Platformu}
    C -->|Otomatik Derleme & Optimizasyon| D[ Vercel Edge Network]
    D -->|Global Dağıtım| E([ Canlı Portfolyo Sitesi])

    style A fill:#20232a,stroke:#f0db4f,stroke-width:2px,color:#fff
    style B fill:#20232a,stroke:#ffffff,stroke-width:2px,color:#fff
    style C fill:#000000,stroke:#ffffff,stroke-width:2px,color:#fff
    style D fill:#20232a,stroke:#0070f3,stroke-width:2px,color:#fff
    style E fill:#0070f3,stroke:#ffffff,stroke-width:2px,color:#fff
