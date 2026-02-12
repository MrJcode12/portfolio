import { Link } from 'react-router-dom';
import '../styles/styles.css';
import '../styles/Blog.css';

const Blog = () => {
  return (
    <main className="blogPage container">
      <article className="blogArticle">
        <header className="blogHeader">
          <Link to="/" className="backLink">← Back to Portfolio</Link>
          <h1 className="blogTitle">Sinigang: The Sour, Savory Soul of Filipino Cuisine</h1>
          <div className="blogMeta">
            <time dateTime="2025-09-29">September 29, 2025</time>
          </div>
        </header>

        <div className="blogContent">
          <p className="blogIntro">
            There are few dishes that instantly transport a Filipino home, regardless of geography, quite like <strong>Sinigang</strong>. This is more than just a soup; it's a culinary hug, a potent reminder of family gatherings, and a perfect example of the country's love affair with the complex taste profile of <em>asim</em> (sourness). From its history rooted in tropical bounty to its endless regional variations, Sinigang is a dish with true depth. This guide explores the cultural significance of this beloved stew, details its essential components, and provides a foolproof recipe for the classic <em>Sinigang na Baboy</em> (Pork Sinigang).
          </p>

          <h2>A History Stepped in Sourness</h2>
          
          <p>
            Unlike some Filipino dishes that bear heavy Spanish influence, Sinigang is definitively <strong>pre-colonial</strong>. Its existence is a testament to the ingenious use of native, abundant souring agents found across the islands. Before tamarind became the mainstream standard, early Filipinos utilized whatever sour fruit was immediately available—<em>kamias</em> (bilimbi), <em>santol</em> (cotton fruit), or <em>batuan</em> (a fruit native to the Visayas region). This flexibility highlights a core value of Filipino cooking: resourcefulness and adaptation. The simple process of boiling meat or fish with vegetables and a souring agent makes Sinigang one of the purest expressions of indigenous Filipino culinary heritage. Its survival and enduring popularity, even in modern times, cement its status as a national favorite, often rivaling Adobo for the title of the Philippines' signature dish.
          </p>

          <h2>The Anatomy of Sour: Souring Agents</h2>

          <p>
            The character of any Sinigang relies entirely on its sour base. While tamarind is the internationally recognized choice, exploring the other agents opens a world of flavor nuances:
          </p>
          
          <ul>
              <li><strong>Sampalok (Tamarind):</strong> Provides a robust, balanced sourness that is slightly sweet and fruity. This is the foundation of the most common store-bought mixes.</li>
              <li><strong>Kamias (Bilimbi):</strong> Offers a sharp, very tart sourness that cuts through fatty meats perfectly. It's often used when a cleaner, more intense sour punch is desired.</li>
              <li><strong>Batóan (Batuan Fruit):</strong> Popular in Western Visayas (Iloilo and Negros), it lends a sourness that is more complex and earthy than tamarind.</li>
              <li><strong>Guava (Bayabas):</strong> Used primarily in <em>Sinigang sa Bayabas</em>. It produces a milder, sweeter, and cloudier broth, offering a truly unique comfort.</li>
              <li><strong>Green Mango:</strong> Used in some coastal regions, providing a young, slightly resinous sourness.</li>
          </ul>
          
          <p>
            The choice of souring agent profoundly impacts the final taste, demonstrating the regional diversity and culinary depth encapsulated in this single soup.
          </p>

          <h2>Essential Ingredients and Variations</h2>

          <p>
            Beyond the sour base, the integrity of Sinigang is maintained by a consistent assembly of vegetables. These aren't just fillers; they are carefully selected to absorb the broth's tart flavor and provide texture.
          </p>
          
          <p>
            The standard vegetable lineup includes <strong>radish</strong> (<em>labanos</em>), <strong>long green beans</strong> (<em>sitaw</em>), <strong>okra</strong>, <strong>taro</strong> (<em>gabi</em>—which acts as a natural thickener, giving the soup a desirable velvety mouthfeel), <strong>tomatoes</strong>, <strong>onions</strong>, and a leafy green finish, traditionally <strong>water spinach</strong> (<em>kangkong</em>) or sometimes spinach. The inclusion of <strong>siling haba</strong> (long green chili pepper) is crucial not for heat, but for its mild, earthy pepper flavor and aromatic lift.
          </p>
          
          <p>
            Sinigang is incredibly adaptable regarding protein. Common variations include:
          </p>
          
          <ul>
              <li><strong>Sinigang na Hipon:</strong> Shrimp is cooked quickly in the sour broth.</li>
              <li><strong>Sinigang na Isda:</strong> Fish like pompano or snapper is used, often requiring a slightly gentler cooking approach.</li>
              <li><strong>Sinigang na Baka:</strong> Beef short ribs or shanks are simmered until fall-off-the-bone tender.</li>
          </ul>

          <h2>The Perfect Classic: Sinigang na Baboy Recipe</h2>

          <p>
            This recipe yields a rich, authentic <em>Sinigang na Baboy</em> that serves 4-6 people.
          </p>

          <h3>Ingredients</h3>
          
          <ul>
              <li>1.5 kg pork belly or spareribs, cut into 1.5-inch cubes</li>
              <li>1 large onion, quartered</li>
              <li>2 medium tomatoes, quartered</li>
              <li>2 liters (8 cups) water</li>
              <li>1 packet (50g) tamarind soup mix (or pulp equivalent)</li>
              <li>2 pieces taro (<em>gabi</em>), peeled and quartered</li>
              <li>1 piece radish (<em>labanos</em>), peeled and sliced into ½-inch rounds</li>
              <li>1 bundle long beans (<em>sitaw</em>), cut into 2-inch pieces</li>
              <li>6 pieces okra, ends trimmed</li>
              <li>2 pieces long green chili peppers (<em>siling haba</em>), whole</li>
              <li>1 bundle water spinach (<em>kangkong</em>), leaves and tender stems separated</li>
              <li>Fish sauce (<em>patis</em>) and salt to taste</li>
          </ul>

          <h3>Instructions</h3>
          
          <ol>
              <li><strong>Prepare the Broth:</strong> In a large pot, combine the pork and water. Bring to a boil over high heat, then immediately reduce the heat to a simmer. Skim off any impurities or foam that rises to the surface.</li>
              <li><strong>First Simmer:</strong> Add the quartered onion and tomatoes. Cover and simmer for 1 to 1.5 hours, or until the pork is very tender.</li>
              <li><strong>Thickener and Sour:</strong> Add the taro pieces. Continue to simmer until the taro begins to soften and slightly disintegrate (about 15-20 minutes). This step is key for a creamy broth. Add the tamarind mix and stir thoroughly.</li>
              <li><strong>Add Root Vegetables:</strong> Add the sliced radish and long beans. Simmer for 5-7 minutes.</li>
              <li><strong>Seasoning and Chili:</strong> Season the broth generously with fish sauce and a pinch of salt. Add the whole <em>siling haba</em>. Be careful not to puncture them unless you want a spicier soup.</li>
              <li><strong>Final Greens:</strong> Finally, add the okra and the water spinach. Cook just until the greens are wilted (about 2 minutes). Do not overcook the greens to retain their vibrant color and slight crunch.</li>
              <li><strong>Serve:</strong> Transfer the Sinigang into a large serving bowl. Serve immediately with piping hot rice and extra fish sauce on the side for dipping the meat.</li>
          </ol>

          <h2>Conclusion: The Taste of Home</h2>

          <p>
            Sinigang is an encapsulation of the Filipino palate: <strong>bold, complex, and deeply satisfying</strong>. It's the perfect harmony of sour and savory, a dynamic flavor profile that stands apart from the sweet and salty dishes often associated with the region. Its enduring popularity is proof that simple, honest cooking, rooted in local ingredients and history, creates a comfort food that transcends generations and borders. Whether you use fresh tamarind or a convenient mix, whether you choose pork, shrimp, or fish, the resulting sour broth remains undeniably the taste of the Filipino home. Don't just make the recipe—savor the history and cultural story in every spoonful.
          </p>
        </div>

        <footer className="blogFooter">
        </footer>
      </article>
    </main>
  );
};

export default Blog;
