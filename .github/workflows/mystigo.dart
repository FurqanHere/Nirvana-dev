 //////------------Merge Apppppp/////////////////////

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const MystigoApp());
}

class MystigoApp extends StatelessWidget {
  const MystigoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const IntroSplash(),
    );
  }
}

/// ------------------------------------------------------------
///                      SPLASH SCREEN
/// ------------------------------------------------------------

class IntroSplash extends StatefulWidget {
  const IntroSplash({super.key});

  @override
  State<IntroSplash> createState() => _IntroSplashState();
}

class _IntroSplashState extends State<IntroSplash> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(seconds: 3), () {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => OnboardingMain(),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFF6A5AE0),
              Color(0xFFB847F5),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        alignment: Alignment.center,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _logoBox(),
            const SizedBox(height: 28),
            _title(),
            const SizedBox(height: 8),
            _subtitle(),
            const SizedBox(height: 35),
            _dotsRow(),
          ],
        ),
      ),
    );
  }

  Widget _logoBox() {
    return Container(
      height: 120,
      width: 120,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(32),
        color: Colors.white.withOpacity(.18),
      ),
      child: const Icon(
        Icons.location_on_outlined,
        color: Colors.white,
        size: 55,
      ),
    );
  }

  Widget _title() {
    return Text(
      "Mystigo",
      style: GoogleFonts.pacifico(
        color: Colors.white,
        fontSize: 46,
      ),
    );
  }

  Widget _subtitle() {
    return Text(
      "Discover Your Perfect Escape",
      style: GoogleFonts.poppins(
        color: Colors.white.withOpacity(.92),
        fontSize: 15,
      ),
    );
  }

  Widget _dotsRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        3,
            (_) => Container(
          margin: const EdgeInsets.symmetric(horizontal: 6),
          width: 10,
          height: 10,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(.9),
            shape: BoxShape.circle,
          ),
        ),
      ),
    );
  }
}

/// ------------------------------------------------------------
///                     ONBOARDING SCREENS
/// ------------------------------------------------------------

class OnboardingMain extends StatefulWidget {
  @override
  State<OnboardingMain> createState() => _OnboardingMainState();
}

class _OnboardingMainState extends State<OnboardingMain> {
  final PageController _controller = PageController();
  int currentIndex = 0;

  final List<IconData> icons = [
    Icons.lightbulb_outline,
    Icons.movie,
    Icons.map,
  ];
  final List<String> images = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/f7/0b/1f/terrasse-du-restaurant.jpg?w=500&h=-1&s=1",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=60", ];


  final List<String> titles = [
    "AI-Powered Discovery",
    "Cinematic Previews",
    "Hidden Gems &\nPeaceful Spots"
  ];

  final List<String> subtitles = [
    "Get personalized recommendations\nbased on your mood, preferences and budget",
    "Experience destinations through stunning\nvideo clips with AI narration and ambience insights",
    "Find quiet cafés, serene gardens, and low-\ntraffic locations perfect for your mood",
  ];

  Widget _dot(bool active) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      width: active ? 25 : 10,
      height: 10,
      decoration: BoxDecoration(
        color: active ? Colors.purple : Colors.grey.shade300,
        borderRadius: BorderRadius.circular(10),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          //-------------------- PAGEVIEW --------------------
          Expanded(
            child: PageView.builder(
              controller: _controller,
              itemCount: images.length,
              onPageChanged: (index) {
                setState(() => currentIndex = index);
              },
              itemBuilder: (context, index) {
                return SingleChildScrollView(
                  child: onboardingPage(
                    images[index],
                    titles[index],
                    subtitles[index],
                    icons[index],
                  ),
                );
              },
            ),
          ),

          //-------------------- PAGE INDICATOR --------------------
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              images.length,
                  (index) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: _dot(currentIndex == index),
              ),
            ),
          ),

          const SizedBox(height: 25),

          //-------------------- BUTTON --------------------
          Padding(
            padding: const EdgeInsets.only(bottom: 30),
            child: GestureDetector(
              onTap: () {
                if (currentIndex < images.length - 1) {
                  _controller.nextPage(
                    duration: const Duration(milliseconds: 400),
                    curve: Curves.easeInOut,
                  );
                } else {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => const MoodSelector()),
                  );
                }
              },
              child: Container(
                width: 330,
                height: 55,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF6D4AFF), Color(0xFFB659FF)],
                  ),
                  borderRadius: BorderRadius.circular(30),
                ),
                child: Center(
                  child: Text(
                    currentIndex == images.length - 1 ? "Get Started" : "Next",
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  //-------------------- SINGLE ONBOARDING PAGE --------------------
  Widget onboardingPage(
      String image, String title, String subtitle, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Column(
        children: [
          Stack(
            children: [
              SizedBox(
                height: 330,
                width: double.infinity,
                child: Image.network(image, fit: BoxFit.cover),
              ),
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  height: 120,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withOpacity(0),
                        Colors.white,
                        Colors.white,
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 50,
                right: 20,
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (_) => const MoodSelector()),
                    );
                  },
                  child: const Text(
                    "Skip",
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 25),

          // ICON BOX
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.purple.shade200,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.white, size: 28),
          ),

          const SizedBox(height: 25),

          // TITLE
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 12),

          // SUBTITLE
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Text(
              subtitle,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 15, color: Colors.black87),
            ),
          ),
        ],
      ),
    );
  }
}

/// ------------------------------------------------------------
///                     MOOD SELECT SCREEN
/// ------------------------------------------------------------

class MoodSelector extends StatefulWidget {
  const MoodSelector({super.key});

  @override
  State<MoodSelector> createState() => _MoodSelectorState();
}

class _MoodSelectorState extends State<MoodSelector> with SingleTickerProviderStateMixin {
  final List<String> _chosenMoods = [];
  String _chosenBudget = "Premium";

  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  /// Mood dataset with icon + name + gradient + colorful icon
  final List<_MoodItem> _moods = [
    _MoodItem("Relaxed", Icons.spa, [const Color(0xff23C186), const Color(0xff63E2A0)], Color(0xff23C186)),
    _MoodItem("Foodie", Icons.restaurant, [const Color(0xffF76B1C), const Color(0xffFAD961)], Color(0xffF76B1C)),
    _MoodItem("Social", Icons.people_alt, [const Color(0xff4F7BFF), const Color(0xff7BA7FF)], Color(0xff4F7BFF)),
    _MoodItem("Adventurous", Icons.rocket_launch, [const Color(0xffDA46F9), const Color(0xffF375C7)], Color(0xffDA46F9)),
    _MoodItem("Cultural", Icons.theater_comedy, [const Color(0xffFFBB23), const Color(0xffFFDD55)], Color(0xffFFBB23)),
    _MoodItem("Nature", Icons.park, [const Color(0xff00C6FB), const Color(0xff0CF5A1)], Color(0xff00C6FB)),
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _scaleAnimation = Tween<double>(begin: 0.95, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOutBack),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final itemWidth = (size.width - 60) / 2;

    return Scaffold(
      backgroundColor: const Color(0xffF6F3FF),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 45, 20, 40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _header(),
            const SizedBox(height: 22),
            _sectionTitle("Choose Your Mood"),
            const SizedBox(height: 16),
            Wrap(
              spacing: 16,
              runSpacing: 16,
              children: _moods.asMap().entries.map((entry) {
                final index = entry.key;
                final mood = entry.value;
                final bool active = _chosenMoods.contains(mood.label);

                return AnimatedBuilder(
                  animation: _animationController,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _scaleAnimation.value,
                      child: child,
                    );
                  },
                  child: GestureDetector(
                    onTap: () {
                      setState(() {
                        if (active) {
                          _chosenMoods.remove(mood.label);
                        } else {
                          _chosenMoods.add(mood.label);
                          _animationController.forward(from: 0);
                        }
                      });
                    },
                    child: _moodTile(mood, itemWidth, active, index),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 32),
            _sectionTitle("Budget Range"),
            const SizedBox(height: 16),
            _budgetSelector("Budget", "<  PKR 4,000", Icons.savings, 0),
            const SizedBox(height: 14),
            _budgetSelector("Moderate", "PKR 4,000 - 12,000", Icons.account_balance_wallet, 1),
            const SizedBox(height: 14),
            _budgetSelector("Premium", "> PKR 12,000", Icons.workspace_premium, 2),
            const SizedBox(height: 45),
            _continueButton(),
          ],
        ),
      ),
    );
  }

  Widget _header() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
          text: TextSpan(
            text: "What's Your ",
            style: GoogleFonts.inter(
              fontSize: 26,
              fontWeight: FontWeight.w700,
              color: Colors.black,
            ),
            children: [
              TextSpan(
                text: "Vibe?",
                style: GoogleFonts.inter(
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                  foreground: Paint()
                    ..shader = const LinearGradient(
                      colors: [Color(0xff5F38FB), Color(0xffA34FF0)],
                    ).createShader(const Rect.fromLTWH(0, 0, 200, 70)),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 6),
        Text(
          "Select your mood and budget to get personalized recommendations.",
          style: GoogleFonts.inter(
            fontSize: 14,
            color: Colors.grey[700],
          ),
        ),
      ],
    );
  }

  Widget _sectionTitle(String text) {
    return Row(
      children: [
        Text(
          text,
          style: GoogleFonts.inter(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(width: 8),
        Icon(
          Icons.arrow_forward_ios,
          size: 14,
          color: Colors.grey[600],
        ),
      ],
    );
  }

  Widget _moodTile(_MoodItem item, double width, bool active, int index) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      width: width,
      height: 120,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        gradient: active ? LinearGradient(colors: item.gradient) : null,
        color: active ? null : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: active
            ? [
          BoxShadow(
            color: item.gradient[0].withOpacity(0.3),
            blurRadius: 15,
            spreadRadius: 2,
            offset: const Offset(0, 5),
          ),
        ]
            : const [
          BoxShadow(
            color: Color(0x15000000),
            blurRadius: 8,
            offset: Offset(0, 3),
          )
        ],
      ),
      child: Stack(
        children: [
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: active ? Colors.white.withOpacity(0.3) : item.iconColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: active
                        ? Border.all(color: Colors.white.withOpacity(0.5), width: 2)
                        : null,
                  ),
                  child: Icon(
                    item.icon,
                    size: 30,
                    color: active ? Colors.white : item.iconColor,
                    shadows: active
                        ? [
                      const Shadow(
                        color: Colors.black26,
                        blurRadius: 5,
                        offset: Offset(1, 1),
                      )
                    ]
                        : null,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  item.label,
                  style: GoogleFonts.inter(
                    color: active ? Colors.white : Colors.black87,
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            top: 4,
            right: 4,
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              child: active
                  ? Container(
                padding: const EdgeInsets.all(4),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check_circle,
                  color: item.gradient[0],
                  size: 18,
                ),
              )
                  : Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.add,
                  color: Colors.grey.shade600,
                  size: 16,
                ),
              ),
            ),
          ),
          // Hover effect layer
          Positioned.fill(
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(18),
                onTap: null,
                splashColor: item.iconColor.withOpacity(0.3),
                highlightColor: item.iconColor.withOpacity(0.1),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _budgetSelector(String title, String amount, IconData icon, int index) {
    final active = _chosenBudget == title;
    final gradientColors = [
      const LinearGradient(colors: [Color(0xffFF6B6B), Color(0xffFFA36C)]),
      const LinearGradient(colors: [Color(0xff4F7BFF), Color(0xff7BA7FF)]),
      const LinearGradient(colors: [Color(0xff5F38FB), Color(0xffA34FF0)]),
    ];

    return GestureDetector(
      onTap: () {
        setState(() {
          _chosenBudget = title;
          _animationController.forward(from: 0);
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        height: 82,
        padding: const EdgeInsets.symmetric(horizontal: 18),
        decoration: BoxDecoration(
          gradient: active ? gradientColors[index] : null,
          color: active ? null : Colors.white,
          borderRadius: BorderRadius.circular(15),
          boxShadow: active
              ? [
            BoxShadow(
              color: gradientColors[index].colors[0].withOpacity(0.3),
              blurRadius: 15,
              spreadRadius: 2,
              offset: const Offset(0, 5),
            ),
          ]
              : const [
            BoxShadow(
              color: Color(0x15000000),
              blurRadius: 8,
              offset: Offset(0, 3),
            )
          ],
        ),
        child: Row(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: active ? Colors.white.withOpacity(0.3) : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(12),
                border: active
                    ? Border.all(color: Colors.white.withOpacity(0.5), width: 2)
                    : null,
              ),
              child: Icon(
                icon,
                size: 24,
                color: active ? Colors.white : gradientColors[index].colors[0],
              ),
            ),
            const SizedBox(width: 16),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: active ? Colors.white : Colors.black,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  amount,
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    color: active ? Colors.white70 : Colors.grey[600],
                  ),
                ),
              ],
            ),
            const Spacer(),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              child: active
                  ? Container(
                padding: const EdgeInsets.all(2),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check_circle,
                  color: gradientColors[index].colors[0],
                  size: 22,
                ),
              )
                  : Icon(
                Icons.circle_outlined,
                color: Colors.grey.shade400,
                size: 22,
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _continueButton() {
    return MouseRegion(
      onEnter: (_) => _animationController.forward(from: 0),
      child: GestureDetector(
        onTap: () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => HomeScreen()),
          );
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          height: 55,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            gradient: const LinearGradient(
              colors: [Color(0xff5F38FB), Color(0xffA34FF0)],
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xff5F38FB).withOpacity(0.4),
                blurRadius: 15,
                spreadRadius: 2,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          alignment: Alignment.center,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Continue to Explore",
                style: GoogleFonts.inter(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 10),
              const Icon(
                Icons.arrow_forward_rounded,
                color: Colors.white,
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Data class for mood items
class _MoodItem {
  final String label;
  final IconData icon;
  final List<Color> gradient;
  final Color iconColor;

  _MoodItem(this.label, this.icon, this.gradient, this.iconColor);
}
/// ------------------------------------------------------------
///                     HOME SCREEN
/// ------------------------------------------------------------

class HomeScreen extends StatelessWidget {
  final List<Category> categories = [
    Category('Peaceful', Icons.eco, const Color(0xFF27C281)),
    Category('Food', Icons.restaurant, const Color(0xFFEF5444)),
    Category('Culture', Icons.apartment, const Color(0xFFF1B52E)),
    Category('Nature', Icons.spa, const Color(0xFF18BFBF)),
    Category('Events', Icons.event, const Color.fromARGB(255, 247, 74, 189)),
    Category('Hidden', Icons.location_on, const Color.fromARGB(255, 117, 89, 182)),
  ];

  final List<Recommendation> items = [
    Recommendation(
      title: 'Serenity Garden Cafe',
      subtitle: 'Downtown District',
      image:
      'https://readdy.ai/api/search-image?query=Peaceful%20garden%20cafe%20with%20lush%20greenery%2C%20cozy%20outdoor%20seating%2C%20warm%20ambient%20lighting%2C%20tranquil%20atmosphere%2C%20beautiful%20plants%20and%20flowers%2C%20inviting%20terrace%2C%20professional%20photography%2C%20vibrant%20natural%20colors%2C%20serene%20composition&width=375&height=240&seq=dest1&orientation=landscape',
      tag: 'Relaxed',
      rating: 4.8,
      crowd: 'Low',
      noise: 'Quiet',
      distance: '2.3 km',
      price: '\$25',
    ),
    Recommendation(
      title: 'Sunset Vista Point',
      subtitle: 'Hillside Park',
      image:
      'https://i.pinimg.com/236x/ea/dc/9b/eadc9bf98630eeb0d734b7a3305af49b.jpg',
      tag: 'Adventurous',
      rating: 4.9,
      crowd: 'Medium',
      noise: 'Peaceful',
      distance: '5.7 km',
      price: '\$15',
    ),
    Recommendation(
      title: 'Artisan Food Market',
      subtitle: 'Cultural Quarter',
      image:
      'https://img.freepik.com/free-photo/high-angle-shot-plates-salad-fresh-fruits-vegetable-wooden-surface_181624-46700.jpg?semt=ais_hybrid&w=740&q=80',
      tag: 'Foodie',
      rating: 4.7,
      crowd: 'High',
      noise: 'Lively',
      distance: '1.8 km',
      price: '\$40',
    ),
    Recommendation(
      title: 'Zen Meditation Garden',
      subtitle: 'Temple District',
      image:
      'https://readdy.ai/api/search-image?query=Traditional%20zen%20meditation%20garden%20with%20raked%20sand%20patterns%2C%20peaceful%20rock%20arrangements%2C%20minimalist%20Japanese%20design%2C%20tranquil%20atmosphere%2C%20soft%20natural%20lighting%2C%20serene%20landscape%20photography%2C%20calming%20composition%2C%20spiritual%20ambience&width=375&height=240&seq=dest4&orientation=landscape',
      tag: 'Relaxed',
      rating: 4.8,
      crowd: 'Very Low',
      noise: 'Silent',
      distance: '4.2 km',
      price: '\$10',
    ),
    Recommendation(
      title: 'Heritage Musem',
      subtitle: 'Old Town',
      image:
      'https://readdy.ai/api/search-image?query=Beautiful%20heritage%20museum%20interior%20with%20ancient%20artifacts%2C%20elegant%20exhibition%20halls%2C%20cultural%20displays%2C%20warm%20museum%20lighting%2C%20historical%20architecture%2C%20sophisticated%20atmosphere%2C%20professional%20museum%20photography%2C%20educational%20ambience&width=375&height=240&seq=dest5&orientation=landscape',
      tag: 'Cultural',
      rating: 4.9,
      crowd: 'Low',
      noise: 'Quiet',
      distance: '3.1km',
      price: '\$12',
    ),
    Recommendation(
      title: '  Secret Rooftop Garden',
      subtitle: 'Hidden Alley',
      image:
      'https://readdy.ai/api/search-image?query=Hidden%20rooftop%20garden%20oasis%20with%20lush%20plants%2C%20cozy%20seating%2C%20city%20views%2C%20peaceful%20urban%20escape%2C%20beautiful%20greenery%2C%20intimate%20atmosphere%2C%20secret%20spot%20photography%2C%20tranquil%20hideaway%2C%20magical%20ambience&width=375&height=240&seq=dest6&orientation=landscape',
      tag: 'Adventurous',
      rating: 4.8,
      crowd: 'Very Low',
      noise: 'Peacful',
      distance: '2.8 km',
      price: '\$8',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        selectedItemColor: Colors.deepPurple,
        unselectedItemColor: Colors.grey,
        showSelectedLabels: true,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.explore), label: 'Discover'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Map'),
          BottomNavigationBarItem(icon: Icon(Icons.event), label: 'Events'),
          BottomNavigationBarItem(
            icon: Icon(Icons.cloud_download),
            label: 'Offline',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // --- HEADER ---
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF6A5AE0), Color(0xFFB847F5)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.vertical(
                  bottom: Radius.circular(20),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        'Mystigo',
                        style: GoogleFonts.pacifico(
                          color: Colors.white,
                          fontSize: 28,
                        ),
                      ),
                      const Spacer(),
                      CircleAvatar(
                        radius: 18,
                        backgroundColor: Colors.white24,
                        child: Icon(
                          Icons.notifications_none,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Discover your perfect escape',
                    style: TextStyle(color: Colors.white70),
                  ),
                  const SizedBox(height: 14),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.18),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.search, color: Colors.white70),
                        const SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            style: const TextStyle(color: Colors.white),
                            decoration: InputDecoration(
                              hintText: 'Search destinations, events...',
                              hintStyle: const TextStyle(color: Colors.white70),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // --- BODY ---
            Expanded(
              child: Container(
                color: Colors.grey[100],
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 88,
                        child: ListView.separated(
                          scrollDirection: Axis.horizontal,
                          itemCount: categories.length,
                          separatorBuilder: (_, __) => const SizedBox(width: 12),
                          itemBuilder: (context, index) =>
                              CategoryCard(category: categories[index]),
                        ),
                      ),
                      const SizedBox(height: 18),
                      const Text(
                        'Recommended for you',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Column(
                        children: items
                            .map(
                              (rec) => Padding(
                            padding: const EdgeInsets.only(bottom: 16.0),
                            child: RecommendationCard(item: rec),
                          ),
                        )
                            .toList(),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ------------------- CATEGORY MODEL & CARD ---------------------
class Category {
  final String name;
  final IconData icon;
  final Color color;
  Category(this.name, this.icon, this.color);
}

class CategoryCard extends StatelessWidget {
  final Category category;
  const CategoryCard({required this.category});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Material(
          elevation: 3,
          borderRadius: BorderRadius.circular(14),
          child: Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              gradient: LinearGradient(
                colors: [
                  category.color.withOpacity(0.9),
                  category.color.withOpacity(0.6),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Icon(category.icon, color: Colors.white, size: 30),
          ),
        ),
        const SizedBox(height: 6),
        SizedBox(
          width: 72,
          child: Text(
            category.name,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

// ------------------- RECOMMENDATION MODEL ---------------------
class Recommendation {
  final String title;
  final String subtitle;
  final String image;
  final String tag;
  final double rating;
  final String crowd;
  final String noise;
  final String distance;
  final String price;

  Recommendation({
    required this.title,
    required this.subtitle,
    required this.image,
    required this.tag,
    required this.rating,
    required this.crowd,
    required this.noise,
    required this.distance,
    required this.price,
  });
}

// ------------------- RECOMMENDATION CARD ---------------------
class RecommendationCard extends StatelessWidget {
  final Recommendation item;
  const RecommendationCard({required this.item});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Clicked: ${item.title}')));
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: const [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 10,
              offset: Offset(0, 6),
            ),
          ],
        ),
        child: Column(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
              child: Stack(
                children: [
                  AspectRatio(
                    aspectRatio: 16 / 9,
                    child: Image.network(
                      item.image,
                      fit: BoxFit.cover,
                      width: double.infinity,
                    ),
                  ),
                  Positioned(
                    left: 12,
                    top: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.92),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        item.tag,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                  const Positioned(
                    right: 12,
                    top: 12,
                    child: CircleAvatar(
                      backgroundColor: Colors.black38,
                      child: Icon(Icons.play_arrow, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          item.title,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.yellow[150], // light yellow
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.star,
                              size: 14,
                              color: Colors.yellow[800], // dark yellow
                            ),
                            const SizedBox(width: 6),
                            Text(
                              item.rating.toStringAsFixed(1),
                              style: const TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on_outlined,
                        size: 16,
                        color: Colors.grey,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        item.subtitle,
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _stat(Icons.person_outline, 'Crowd', item.crowd),
                      _stat(Icons.volume_up_outlined, 'Noise', item.noise),
                      _stat(
                        Icons.navigation_outlined,
                        'Distance',
                        item.distance,
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Divider(),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        item.price,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(width: 6),
                      const Text('estimated', style: TextStyle(color: Colors.grey)),
                      const Spacer(),
                      // Gradient Button
                      Container(
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF6A5AE0), Color(0xFFB847F5)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(14),
                            onTap: () {},
                            child: const Padding(
                              padding: EdgeInsets.symmetric(
                                horizontal: 10,
                                vertical: 8,
                              ),
                              child: Text(
                                'View Details',
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _stat(IconData icon, String title, String value) {
    Color iconColor;
    switch (title) {
      case 'Crowd':
        iconColor = Colors.green[300]!;
        break;
      case 'Noise':
        iconColor = Colors.blue[300]!;
        break;
      case 'Distance':
        iconColor = Colors.pink[300]!;
        break;
      default:
        iconColor = Colors.grey[700]!;
    }

    return Row(
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: Colors.grey[100],
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, size: 18, color: iconColor),
        ),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            ),
            Text(value, style: const TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
      ],
    );
  }
}